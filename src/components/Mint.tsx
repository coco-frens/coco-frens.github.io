import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { updateCalc } from '../features/math/math-slice.ts'
import { setContractData, initedState } from '../features/web3/web3-slice.ts'

import { useAccount, useConnect, useContractReads, useEnsName, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Form, Field } from 'react-final-form'
import MintControls from './MintControls.tsx'

import Decimals from '../utils/Decimals.js'
const decimals = new Decimals()
const { com, d, numberWithCommas } = decimals

import './Mint.css'

let aiCocoContractAddress
let cocoContractAddress
let ready

function Mint() {

  const { address, isConnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error: connectionError } = useConnect({
    connector: new InjectedConnector(),
    onSuccess(connectionData){
      switch (chain.name) {
        case 'Goerli':
          aiCocoContractAddress = '0x87c87C7B624027d82D8c177054D5FcBcAC1bA3A6'
          cocoContractAddress =  '0xf05b8B90D99B7eDacC270d8A7db6C36F1DD63f72'
          break
        case 'Ethereum':
          aiCocoContractAddress = 'somewhereonmainnet'
          cocoContractAddress = '0xE6DBeAdD1823B0BCfEB27792500b71e510AF55B3'
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
  const dispatch = useAppDispatch()

  let ready, totalBurned
  useAppSelector((state) => {
    ready = state.web3.ready
    totalBurned = state.web3.totalBurned
  })
  
  let error
  if (connectionError) {
    if (connectionError.details) error = connectionError.details
    else if (connectionError.message) error = connectionError.message + '. Get Metamask!'
  }

  return (
    <div className="container">
      <div className="mintSection mint">
        <h2>Ai Coco - Burn coco to mint tokens...</h2>
        {totalBurned > 0 && <>AiCoco NFT has burned {com(d(totalBurned, 18))} COCO!</>}
      </div>
      <div className="mintSection mint">
        <>
          {isConnected && <div>Your account: {ensName ?? address}</div>}
          {!isConnected && <button onClick={() => connect()}>Connect Wallet</button>}
          {error && <><br />Error: { error }</>}
          <br />
          {isConnected && <>Connected via: {connector.name} {chain.name}</>}
          <br /><br />
          {isConnected && <MintControls />}
        </>
      </div>
    </div>
  )
}

export default Mint
