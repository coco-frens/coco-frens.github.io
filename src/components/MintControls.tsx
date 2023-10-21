import { useEffect } from 'react'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { erc20ABI } from 'wagmi'

import Decimals from '../utils/Decimals.js'
const decimals = new Decimals()
const { d, com, gt, gte, lte, divide } = decimals

import { updateCalc } from '../features/math/math-slice.ts'
import { readyState } from '../features/web3/web3-slice.ts'
import { causeError } from '../features/display-slice.ts'
import { Tooltip } from 'react-tooltip'

import MintApprove from './MintApprove.tsx'
import MintToken from './MintToken.tsx'

import { 
  useContractReads, 
} from 'wagmi'

import { aiCocoAbi } from '../utils/aiCocoAbi.ts'

const selectAddressInfo = (state:any) => ({
  address: state.web3.address,
  aiCocoContractAddress: state.web3.aiCocoContractAddress,
  cocoContractAddress: state.web3.cocoContractAddress
})
const memoizedAddressInfo = createSelector([selectAddressInfo], _ => _)

const selectNumOfTokensInfo = (state:any) => state.math.numOfTokens
const memoizedNumOfTokens = createSelector([selectNumOfTokensInfo], _ => _) 

const contractReadData = (state:any) => ({
  price: state.web3.price,
  mintOpen: state.web3.mintOpen,
  userBalance: state.web3.userBalance,
  aiCocoAllowance: state.web3.aiCocoAllowance,
  cidLength: state.web3.cidLength,
  tokenCounter: state.web3.tokenCounter,
  walletOfOwner: state.web3.walletOfOwner
})
const memoizedContractReadData = createSelector([contractReadData], _ => _)

const errorData = (state:any) => ({
  error: state.display.error,
  errorMessage: state.display.errorMessage
})
const memoizedErrorData = createSelector([errorData], _ => _)

function MintControls() {

  const dispatch = useAppDispatch()
  const { address, aiCocoContractAddress, cocoContractAddress } = useAppSelector(memoizedAddressInfo)
  const numOfTokens = useAppSelector(memoizedNumOfTokens)
  const totalCoco = useAppSelector((state) => state.math.totalCoco)
  const wasApproved = useAppSelector((state) => state.web3.wasApproved)
  const doRefetch = useAppSelector((state) => state.web3.doRefetch)
  const { error, errorMessage } = useAppSelector(memoizedErrorData)
  const ready = useAppSelector((state) => state.web3.ready)

  const { price, mintOpen, userBalance, aiCocoAllowance, cidLength, tokenCounter, walletOfOwner } = useAppSelector(memoizedContractReadData)

  const remap = (data: Array<any>) => {
    const map: string[] = []
    data.forEach((d) => {
      if (d.status !== 'success') {
        map.push('error')
      } else {
        map.push(String(d.result))
      }
    })
    return map
  }
  const { refetch } = useContractReads({
    contracts: [
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'totalBurned' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'pricePerNft' },
      { address: aiCocoContractAddress, abi: aiCocoAbi, functionName: 'publicMintOpen' },
      { address: cocoContractAddress, abi: erc20ABI, functionName: 'balanceOf', args: [address] },
      { address: cocoContractAddress, abi: erc20ABI, functionName: 'allowance', args: [address, aiCocoContractAddress] }, // owner, spender
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

  // when refetched, update tokenCalc
  useEffect(() => {
    if (doRefetch) {
      refetch()
      if (gt(aiCocoAllowance, '0') && gt(price, '0')) {
        const tokensStr = divide(aiCocoAllowance, price)
        let tokens = Math.trunc(Number(tokensStr))
        if (tokens > 5) tokens = 5
        setTokens(tokens, price)
        // document.getElementById("r" + tokens).checked = true // ideally update the form to check checked
      }
    }
  })

  const setTokens = (_numOfTokens: number, _price: string) => {
    dispatch(updateCalc({ numOfTokens: _numOfTokens, price: _price }))
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
            {!ready && <><br />loading contract data...<br /></>}
            {ready == true &&
              <>
              {mintOpen == false && <>Minting is currently not available.</>}
                {nftsAvailable === 0 && <>Sorry there are no NFT's available to mint at this time...</>}
                {mintOpen == true && nftsAvailable > 0 &&
                  <>

                    NFT's available right now: {nftsAvailable} <br />
                    Cost: {com(d(price, 18))} Coco<br /><br />
                    <b className="burnHeader">All proceeds are immediately burned.</b>
                    <br /><br />

                <div className="smallTxt">Your COCO Balance: {com(d(userBalance, 18))}</div>
                {walletOfOwner > 0 && <div className="smallTxt">You own {walletOfOwner} AiCoco NFT's<br /></div>}
                <div className="smallTxt">Current contract Allowance {com(d(aiCocoAllowance, 18))}</div>

                <br />

                    <Tooltip id="buttons-tip" />
                    <div
                     data-tooltip-id="buttons-tip"
                     data-tooltip-content="Select a number of tokens to mint..."
                     data-tooltip-place="top"
                    //  className="formBorder"
                    >
                  Select How many NFTs?<br /><br />
                      {nftsAvailable >= 1 && <><input id="r1" type="radio" value="1" name="numOfTokens" onClick={() => setTokens(1, price)} /> 1<br /></>}
                      {nftsAvailable >= 2 && <><input id="r2" type="radio" value="2" name="numOfTokens" onClick={() => setTokens(2, price)} /> 2<br /></>}
                      {nftsAvailable >= 3 && <><input id="r3" type="radio" value="3" name="numOfTokens" onClick={() => setTokens(3, price)} /> 3<br /></>}
                      {nftsAvailable >= 4 && <><input id="r4" type="radio" value="4" name="numOfTokens" onClick={() => setTokens(4, price)} /> 4<br /></>}
                      {nftsAvailable >= 5 && <><input id="r5" type="radio" value="5" name="numOfTokens" onClick={() => setTokens(5, price)} /> 5<br /></>}
                    </div>
                <br />

                    Total COCO to burn: {com(d(totalCoco, 18))}<br /><br />
                    {numOfTokens === 0 && <div>Select Number of tokens to Approve</div>}
                  </>

                }

              {mintOpen == true && numOfTokens > 0 && nftsAvailable > 0 &&
                <>
                  Step 1 of 2: <br />
                   {gte(aiCocoAllowance, totalCoco) && gte(userBalance, totalCoco) &&
                    <>
                      <div className="burnHeader">OK to mint {numOfTokens} NFT {numOfTokens > 1 && <>'s!</>}</div>
                      <br /><br />
                    </>
                  }
                {gte(userBalance, totalCoco) && lte(aiCocoAllowance, totalCoco) &&
                  <>
                  Approve AiCoco Contract to spend {com(d(totalCoco, 18))}<br />
                  <MintApprove />
                  </>
                }
                </>
              }

              {mintOpen == true && (wasApproved || gte(aiCocoAllowance, totalCoco)) && numOfTokens > 0 && gte(userBalance, totalCoco) &&
                <div>
                  Step 2 of 2:  <br />
                  <div className="burnHeader">Mint {numOfTokens} AiCoCo</div><br /><br />
                  <MintToken />
                </div>
              }
              
              {!gte(userBalance, totalCoco) && <> Cannot mint: User Balance not sufficient to mint tokens</>}

              </>
            }


          </>
        </div>
      </div>
    )
  }
}


export default MintControls