import { useEffect } from 'react'
import { createSelector } from 'reselect'

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

const selectAddressInfo = (state:any) => ({
  aiCocoContractAddress: state.web3.aiCocoContractAddress,
})
const memoizedAddressInfo = createSelector([selectAddressInfo], _ => _)

function MintToken() {

  const dispatch = useAppDispatch()

  const { aiCocoContractAddress } = useAppSelector(memoizedAddressInfo)
  const numOfTokens = useAppSelector((state) => state.math.numOfTokens)

  const { config } = usePrepareContractWrite({
    address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'publicMintMulti', args: [numOfTokens]
  })
  const { data, isLoading, isSuccess, isError, error, write, reset } = useContractWrite(config)

  const hash = data?.hash

  const { isFetching: txData, isSuccess: isBroadcasted } = useWaitForTransaction({
    hash: hash,
  })
  useEffect(() => {
    if (isBroadcasted) {
      if (once === 0) {
        console.log('Mint Success!')
        dispatch(getNewContractData())
        once += 1
      }
    }
  })

  const clearErrorMsg = () => {
    reset()
  }

  if (isError && error) {
    // In this case we want the button to dissappear and let the error be seen, then auto reset after a few seconds
    setTimeout(clearErrorMsg, 3000)
    const errorString = error.message
    return (<div>Error: {errorString}</div>)
  } else if (isLoading || txData){
    return (
      <div>
        <button disabled={true} className="btn-disabled" >Minting</button>
        {isSuccess && <div className="smallTxt">Transaction: {hash}</div>}
      </div>
    )
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
          onClick={() => { write?.(); }}
        >Mint AiCoco
        </button>
        {isLoading && <div>Check Wallet...</div>}
        {isSuccess && <div className="smallTxt">Transaction: {hash}</div>}
      </div>
    )
  }
}

export default MintToken
