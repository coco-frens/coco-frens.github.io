import { createSlice } from '@reduxjs/toolkit'

import {  } from 'wagmi'

interface Web3State {
  ready: boolean
  price: string
  allowance: string
  totalBurned: string
  mintOpen:boolean
  userCocoBalance: string
  aiCocoAllowance: string
  cidLength: number
  tokenCounter: number
  doRefetch: boolean
  address: `0x${string}`
  aiCocoContractAddress: `0x${string}`
  cocoContractAddress: `0x${string}`
  wasApproved:boolean
  userBalance:string
  walletOfOwner: number
}

const initialState: Web3State = {
  ready: false,
  price: '-1',
  allowance: 'null',
  totalBurned: 'null',
  mintOpen: false,
  userCocoBalance: '-1',
  aiCocoAllowance: '-1',
  cidLength: -1,
  tokenCounter: 0,
  doRefetch: false,
  address: '0x',
  aiCocoContractAddress: '0x',
  cocoContractAddress: '0x',
  wasApproved: false,
  userBalance: '-1',
  walletOfOwner: -1,
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

    updateCalc(state) {
      state.price = state.price
    },

    notReady(state) {
      state.ready = false
    },

    approveSuccess(state) {
      state.wasApproved = true
    },

    getNewContractData(state){
      state.doRefetch = true
    }


  }
})

export const { initedState, readyState, updateCalc, notReady, approveSuccess, getNewContractData } = web3Slice.actions
export default web3Slice.reducer
