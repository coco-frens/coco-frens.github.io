import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { Form, Field } from 'react-final-form'
import Decimals from '../utils/Decimals.js'
const decimals = new Decimals()
const { d, com } = decimals

import { updateCalc } from '../features/math/math-slice.ts'
import { readyState, notReady } from '../features/web3/web3-slice.ts'
import { causeError, clearError } from '../features/display-slice.ts'

import MintApprove from './MintApprove.tsx'
import MintToken from './MintToken.tsx'

import { 
  useAccount, 
  useConnect, 
  useContractReads, 
  useEnsName, 
  useNetwork
} from 'wagmi'

import cocoAbi from '../utils/cocoAbi.json'
import aiCocoAbi from '../utils/aiCocoAbi.json'

let aiCocoContractConfig
let aiCocoContractAddress
let cocoContractConfig
let cocoContractAddress
let contractData

function MintControls() {

  const { chain } = useNetwork()
  const dispatch = useAppDispatch()

  let address
  let ready = false

  const setTokens = (_numOfTokens) => {
    dispatch(updateCalc({ numOfTokens: _numOfTokens, price: price }))
  }

  useAppSelector((state) => {
    address = state.web3.address
    aiCocoContractAddress = state.web3.aiCocoContractAddress
    cocoContractAddress = state.web3.cocoContractAddress
  })

  let numOfTokens, totalCoco, wasApproved, doRefetch, error, errorMessage
  useAppSelector((state) => numOfTokens = state.math.numOfTokens)
  useAppSelector((state) => totalCoco = state.math.totalCoco)
  useAppSelector((state) => wasApproved = state.web3.wasApproved)
  useAppSelector((state) => doRefetch = state.web3.doRefetch)
  useAppSelector((state) => { 
    error = state.display.error
    errorMessage = state.display.errorMessage
  })

  // So basically this hook calls the contracts readonly stuff, but we cant use the variables 
  // because the onSuccess callback appears to be out of scope.
  // so we have to send them to the reducer to get inserted in the redux state
  // also set ready = true so that the display can show actual stuff
  const remap = (data) => {
    const map = []
    data.forEach((d) => {
      if (d.status !== 'success') {
        map.push('error')
      } else {
        map.push(String(d.result))
      }
    })
    return map
  }
  const { isFetching, refetch } = useContractReads({
    contracts: [
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'totalBurned' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'pricePerNft' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'publicMintOpen' },
      { address: cocoContractAddress, abi: cocoAbi, functionName: 'balanceOf', args: [address] },
      { address: cocoContractAddress, abi: cocoAbi, functionName: 'allowance', args: [address, aiCocoContractAddress] }, // owner, spender
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'cidLength' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'tokenCounter' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'walletOfOwner', args:[address] }, // owner
    ],
    onSuccess(data) {
      let error = false
      data.forEach((item) => {
        if (item.error) error = true
      })
      if (!error) {
        const newData = remap(data)
        dispatch(readyState(newData))
      } else {
        const message = 'An error occurred loading contract data.'
        dispatch(causeError({errorMessage: message}))
      }
    },
    onError(error) {
      console.log('error, reads', error)
    }
  })
  let totalBurned, price, mintOpen, userBalance, aiCocoAllowance, cidLength, tokenCounter, walletOfOwner
  useAppSelector((state) => {
    ready = state.web3.ready
    totalBurned = state.web3.totalBurned
    price = state.web3.price
    mintOpen = state.web3.mintOpen
    userBalance = state.web3.userBalance
    aiCocoAllowance = state.web3.aiCocoAllowance
    cidLength = state.web3.cidLength
    tokenCounter = state.web3.tokenCounter
    walletOfOwner = state.web3.walletOfOwner
  })

  useEffect(() => {
    if (doRefetch) {
      console.log('doRefetch')
      refetch()
    }
  })

  if (isFetching) {
    dispatch(notReady())
  }

  const nftsAvailable = cidLength - tokenCounter

  if (error) {
    console.log('error: ' + errorMessage)
    return (<div>
      Error: {errorMessage}
    </div>)
  } else {
    return (
      <div>
        <div>
          <>
            {!ready && <> spinner <br />loading contract data<br /></>}
            {ready &&
              <>
                {!mintOpen && <>Minting is currently not available.</>}
                {nftsAvailable === 0 && <>Sorry there are no NFT's available to mint at this time...</>}
                {mintOpen && nftsAvailable > 0 &&
                  <>

                    There are currently {nftsAvailable} AiCoco NFT's available for minting.<br />
                    The cost for each NFT is {com(d(price, 18))} Coco<br /><br />
                    <b>All proceeds are immediately sent to the burn address.</b>
                    <br /><br />

                    Your COCO Balance: {com(d(userBalance, 18))}<br />
                    {walletOfOwner > 0 && <>You own {walletOfOwner} AiCoco NFT's<br /></>}
                    Mint How many NFTs?<br /><br />

                    <div>
                      {nftsAvailable >= 1 && <><input type="radio" value="1" name="numOfTokens" onClick={() => setTokens(1, price)} /> 1<br /></>}
                      {nftsAvailable >= 2 && <><input type="radio" value="2" name="numOfTokens" onClick={() => setTokens(2, price)} /> 2<br /></>}
                      {nftsAvailable >= 3 && <><input type="radio" value="3" name="numOfTokens" onClick={() => setTokens(3, price)} /> 3<br /></>}
                      {nftsAvailable >= 4 && <><input type="radio" value="4" name="numOfTokens" onClick={() => setTokens(4, price)} /> 4<br /></>}
                      {nftsAvailable >= 5 && <><input type="radio" value="5" name="numOfTokens" onClick={() => setTokens(5, price)} /> 5<br /></>}
                    </div>

                    Total COCO to burn: {com(d(totalCoco, 18))}<br /><br />
                  </>

                }

                {mintOpen && numOfTokens > 0 && nftsAvailable > 0 &&
                  <>
                    Step 1 of 2: <br />
                    {aiCocoAllowance >= totalCoco &&
                      <>
                        {/* Current contract Allowance: {com(d(aiCocoAllowance, 18))}<br /> */}
                        complete: OK to mint {numOfTokens} NFT {numOfTokens > 1 && <>'s!</>}
                        <br /><br />
                      </>}
                    {aiCocoAllowance < totalCoco && <>Approve AiCoco Contract to spend {com(d(totalCoco, 18))}<br /></>}
                    {aiCocoAllowance < totalCoco && <MintApprove />}
                  </>}
                {/* <MintApprove /> */}

                {mintOpen && (wasApproved || aiCocoAllowance >= totalCoco) && numOfTokens > 0 &&
                  <>
                    Step 2 of 2:  <br />
                    Mint {numOfTokens} AiCoCo<br /><br />
                    <MintToken />
                  </>}


              </>
            }


          </>
        </div>
      </div>
    )
  }
}


export default MintControls