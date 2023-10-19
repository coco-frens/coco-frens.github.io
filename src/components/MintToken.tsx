import { useEffect } from 'react'

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { Tooltip } from 'react-tooltip'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import aiCocoAbi from '../utils/aiCocoAbi.json'
import { getNewContractData } from '../features/web3/web3-slice.ts'

let once = 0

function MintToken() {

  const dispatch = useAppDispatch()

  let address
  let aiCocoContractAddress
  useAppSelector((state) => {
    address = state.web3.address
    aiCocoContractAddress = state.web3.aiCocoContractAddress
  })

  const numOfTokens = useAppSelector((state) => state.math.numOfTokens)

  const { config } = usePrepareContractWrite({
    address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'publicMintMulti', args: [numOfTokens]
  })

  const { data, isLoading, isSuccess, isError, error, write, reset } = useContractWrite(config)

  const hash = data?.hash

  const { data: broadcastData, isSuccess: isBroadcasted, isError: broadcastError, isLoading: broadcastLoading } = useWaitForTransaction({
    hash: hash,
  })

  const clearErrorMsg = () => {
    reset()
    console.log('clearError Msg')
  }

  const clicked = () => {
    console.log('Minting...')
    console.log('Tokens: ' + numOfTokens)
    console.log('Address: ' + address)
  }

  useEffect(() => {
    if (isBroadcasted) {
      if (once === 0) {
        console.log('Mint Success!')
        dispatch(getNewContractData())
        once += 1
      }
    }
  })

  if (isError) {
    // In this case we want the button to dissappear and let the error be seen, then auto reset after a few seconds
    setTimeout(clearErrorMsg, 3000)
    return (<div>Error: {error.details}</div>)
  } else {
    return (
      <div>
        <Tooltip id="mint-tip" />
        <button
          className="btn"
          data-tooltip-id="mint-tip"
          data-tooltip-content="App is ready to Mint AiCoco. Make sure you confirm in MetaMask!"
          data-tooltip-place="top"
          disabled={!write}
          onClick={() => { clicked(); write?.(); }}
        >Mint AiCoco
        </button>
        {isLoading && <div>Check Wallet...</div>}
        {isSuccess && <div>Transaction: {hash}</div>}
        {isError && <div>Error: {error.details}</div>}
      </div>
    )
  }
}

export default MintToken
