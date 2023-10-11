import { useEffect } from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
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

  const { data, isLoading, isSuccess, isError, error, write } = useContractWrite(config)

  const hash = data?.hash

  const { data: broadcastData, isSuccess: isBroadcasted, isError: broadcastError, isLoading: broadcastLoading } = useWaitForTransaction({
    hash: hash,
  })

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

  return (
    <div>
      <button
        disabled={!write}
        onClick={() => { write?.(); clicked() } }
      >
        Mint AiCoco
      </button>
      {isLoading && <div>Check Wallet...</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      {isError && <div>Error: {error.details}</div>}
    </div>
  )
}

export default MintToken
