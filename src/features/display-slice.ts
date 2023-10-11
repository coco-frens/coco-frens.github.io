import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DisplayState {
  error: boolean
  errorMessage: string
}

const initialState: DisplayState = {
  error: false,
  errorMessage: null
}

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    causeError(state, args) {
      state.error = true
      state.errorMessage = args.payload.errorMessage
    },
    clearError(state, args) {
      state.error = false
      state.errorMessage = null
    }
  }
})

export const { causeError, clearError } = displaySlice.actions
export default displaySlice.reducer
