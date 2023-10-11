import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Decimals from '../../utils/Decimals.js'
const decimals = new Decimals()
const { multBigN } = decimals

interface MathState {
  totalCoco: number
  numOfTokens: number
}

const initialState: MathState = {
  totalCoco: 0,
  numOfTokens: 0
}

const mathSlice = createSlice({
  name: 'math',
  initialState,
  reducers: {
    updateCalc(state, args) {
      state.totalCoco = multBigN(args.payload.numOfTokens, args.payload.price)
      state.numOfTokens = args.payload.numOfTokens
    }
  }
})

export const { updateCalc } = mathSlice.actions
export default mathSlice.reducer
