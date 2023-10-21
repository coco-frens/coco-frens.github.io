import { useEffect } from 'react'
import { createSelector } from 'reselect'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import cocoAbi from '../utils/cocoAbi.json'
import { Tooltip } from 'react-tooltip'
import { getNewContractData } from '../features/web3/web3-slice.ts'


const selectAddressInfo = (state:any) => ({
  aiCocoContractAddress: state.web3.aiCocoContractAddress,
  cocoContractAddress: state.web3.cocoContractAddress
})
const memoizedAddressInfo = createSelector([selectAddressInfo], _ => _)

let once = 0

function MintApprove() {

  const dispatch = useAppDispatch()

  const { cocoContractAddress, aiCocoContractAddress } = useAppSelector(memoizedAddressInfo)

  const totalCoco = useAppSelector((state) => state.math.totalCoco)

  const { config } = usePrepareContractWrite({
    address: cocoContractAddress, abi: cocoAbi, functionName: 'approve', args: [aiCocoContractAddress, totalCoco] // spender, amount
  })

  const { data, isLoading, isSuccess, isError, error, write, reset } = useContractWrite(config)

  const hash = data?.hash

  const { isFetching: txData, isSuccess: isBroadcasted  } = useWaitForTransaction({
    hash: hash,
  })

  const clearErrorMsg = () => {
    reset()
    console.log('clearError Msg')
  }

  useEffect(() => {
    if (isBroadcasted) {
      if (once === 0) {
        console.log('Approval Success!')

        dispatch(getNewContractData())
        once += 1
      }
    } 
  })


  if (isError && error) {
    const errorString = error.message
    // In this case we want the button to dissappear and let the error be seen, then auto reset after a few seconds
    setTimeout(clearErrorMsg, 3000)
    return (<div>Error: {errorString}</div> )
  } else if (isLoading || txData) {
    return (
      <div>
        <button disabled={true} className="btn-disabled" >Approving</button>
        {isSuccess && <div className="smallTxt">Transaction: {hash}</div>}
      </div>
    )
  } else {
    return (
      <div>
        <Tooltip id="approve-tip" />
        <button 
          className="btn" 
          data-tooltip-id="approve-tip"
          data-tooltip-content="In order to mint, you must approve the AiCoco contract to burn coco."
          data-tooltip-place="top"
          disabled={!write} 
          onClick={() => { write?.() }}
        >Approve</button><br />
        {isLoading && <div>Check Wallet...</div>}
        {isSuccess && <div className="smallTxt">Transaction: {hash}</div>}
      </div>
    )
  }
}

export default MintApprove
