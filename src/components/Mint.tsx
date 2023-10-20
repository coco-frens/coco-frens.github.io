import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateCalc } from '../features/math/math-slice.ts'
import { setContractData, initedState } from '../features/web3/web3-slice.ts'
import { 
  useAccount, 
  useConnect, 
  useContractReads, 
  useEnsName, 
  useNetwork 
} from 'wagmi'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { Form, Field } from 'react-final-form'
import MintControls from './MintControls.tsx'
import Message from './Message.tsx'

import gm from '../assets/gm512.png'

import Decimals from '../utils/Decimals.js'
const decimals = new Decimals()
const { com, d, numberWithCommas } = decimals

import './Mint.css'

let aiCocoContractAddress
let cocoContractAddress
let ready
let etherscanUrl

function Mint() {

  const { address, isConnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error: connectionError } = useConnect({
    connector: new MetaMaskConnector(),
    onSuccess(connectionData){
      switch (chain.id) {
        case 1: // mainnet
          aiCocoContractAddress = '0x2c64a8d8462960a687E586F2b3303774390948Cb'
          cocoContractAddress = '0xE6DBeAdD1823B0BCfEB27792500b71e510AF55B3'
          break
        case 5: // Goerli
          aiCocoContractAddress = '0x87c87C7B624027d82D8c177054D5FcBcAC1bA3A6'
          cocoContractAddress =  '0xf05b8B90D99B7eDacC270d8A7db6C36F1DD63f72'
          break
        case 11155111: // sepolia
          aiCocoContractAddress = '0x990DB6C221C01e7E1192652c71c3846665E21441'
          cocoContractAddress = '0xfe9ea3a9f788aa97faba8c4fa280d9f36373f253'
          break
      }
      const readyData = {
        address: address,
        aiCocoContractAddress: aiCocoContractAddress,
        cocoContractAddress: cocoContractAddress
      }
      dispatch(initedState(readyData))
    }
  })

  const { chain } = useNetwork()
  if (chain) {
    let n = chain.network + '.'
    if (chain.network == 'homestead') n = ''
    etherscanUrl = 'https://' + n + 'etherscan.io/address/' + aiCocoContractAddress + '#code'
  }

  const dispatch = useAppDispatch()

  const { totalBurned } = useAppSelector((state) => state.web3.totalBurned)

  const message = useAppSelector((state) => state.display.message)

  let error
  if (connectionError) {
    if (connectionError.details) error = connectionError.details
    else if (connectionError.message) error = connectionError.message + '. Get Metamask!'
  }

  return (
    <div className="container">
      <div className="mintSection mint">
        <img className="headerImg"  src={gm}/>
        <h2 className="burnHeader">Burn coco to mint AiCoco tokens</h2>
        {totalBurned > 0 && <>AiCoco NFT has burned {com(d(totalBurned, 18))} COCO!</>}
      </div>
      <div className="mintSection mint">
        <>
          {isConnected && <div className="smallTxt">Your account: {ensName ?? address}</div>}
          {!isConnected &&
            <>
            <div className="smallTxt">Connect with MetaMask. Other wallets not tested.</div>
            <Tooltip id="connect-tip" />
            <button 
              className="btn" 
              onClick={() => connect()} 
              data-tooltip-id="connect-tip"  
              data-tooltip-content="Get Started by connecting your wallet..."
              data-tooltip-place="top"
            >Connect Wallet</button>
            </>
          }
          {error && <><br />Error: {error}</>}
          {isConnected && <div className="smallTxt">Connected via: {connector.name} {chain.name}</div>}
          <br />
          {isConnected && <MintControls />}
        </>
      </div>
      {isConnected &&
        <div className="mintSection mint">
          <a href={etherscanUrl} target="_blank">View the token contract</a><br />
          <a href="https://opensea.io/collection/aicoco?" target="_blank">https://opensea.io/collection/aicoco?</a><br />
          <Link to="/">Home</Link> | Mint |  <Link to="/Sets">Sets</Link>
        </div>
      }
    </div>

  )
  
}

export default Mint
