import { useEffect } from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import cocoAbi from '../utils/cocoAbi.json'
import { Tooltip } from 'react-tooltip'
import { getNewContractData } from '../features/web3/web3-slice.ts'

let cocoContractConfig
let cocoContractAddress
let aiCocoContractAddress

let once = 0

function MintApprove() {

  const dispatch = useAppDispatch()

  let address

  useAppSelector((state) => {
    address = state.web3.address
    cocoContractAddress = state.web3.cocoContractAddress
    aiCocoContractAddress = state.web3.aiCocoContractAddress
  })

  const totalCoco = useAppSelector((state) => state.math.totalCoco)

  const { config } = usePrepareContractWrite({
    address: cocoContractAddress, abi: cocoAbi, functionName: 'approve', args: [aiCocoContractAddress, totalCoco] // spender, amount
  })

  const { data, isLoading, isSuccess, isError, error, write, reset } = useContractWrite(config)

  const hash = data?.hash

  const { data:broadcastData, isSuccess: isBroadcasted, isError: broadcastError, isLoading: broadcastLoading } = useWaitForTransaction({
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


  if (isError) {
    // In this case we want the button to dissappear and let the error be seen, then auto reset after a few seconds
    setTimeout(clearErrorMsg, 3000)
    return ( <div>Error: {error.details}</div> )
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
        {isError && <div>Error: {error.details}</div>}
      </div>
    )
  }
}

export default MintApprove
