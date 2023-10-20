import { ethers, BigNumber } from 'ethers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import cocoAbi from '../../utils/cocoAbi.json'
import aiCocoAbi from '../../utils/aiCocoAbi.json'

interface Web3State {
  ready: boolean
  price: string
  allowance: string
  totalBurned: string
  mintingStatus: string
  userCocoBalance: string
  aiCocoAllowance: string
  cidLength: number
  tokenCounter: number
  doRefetch: boolean
}

const initialState: Web3State = {
  ready: false,
  price: '',
  allowance: '',
  totalBurned: '',
  mintingStatus: false,
  userCocoBalance: '',
  aiCocoAllowance: '',
  cidLength: 0,
  tokenCounter: 0,
  doRefetch: false
}

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    
    initedState(state, args) {
      state.aiCocoContractAddress = args.payload.aiCocoContractAddress
      state.cocoContractAddress = args.payload.cocoContractAddress
      state.address = args.payload.address
    },

    readyState(state, args) {
      state.totalBurned = String(args.payload[0])
      state.price = String(args.payload[1])
      state.mintOpen = args.payload[2] === 'true' ? true : false
      state.userBalance = String(args.payload[3])
      state.aiCocoAllowance = String(args.payload[4])
      state.cidLength = args.payload[5]
      state.tokenCounter = args.payload[6]
      const wallet = args.payload[7]
      state.walletOfOwner = wallet !== '' ? wallet.split(',').length : 0
      state.ready = true
      state.doRefetch = false
    },

    updateCalc(state, args) {
      state.price = state.price
    },

    notReady(state, args) {
      state.ready = false
    },

    approveSuccess(state, args) {
      state.wasApproved = true
    },

    getNewContractData(state, args){
      state.doRefetch = true
    }


  }
})

export const { initedState, readyState, updateCalc, notReady, approveSuccess, getNewContractData } = web3Slice.actions
export default web3Slice.reducer
