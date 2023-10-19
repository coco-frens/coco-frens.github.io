import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DisplayState {
  error: boolean
  errorMessage: string
  message: boolean
  messageText: string
}

const initialState: DisplayState = {
  error: false,
  errorMessage: null,
  message: false,
  messageText: null
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
    },
    causeMessage(state, args) {
      state.message = true
      state.messageText = args.payload
    },
    clearMessage(state, args) {
      state.message = false
      state.messageText = ''
    }
  }
})

export const { causeError, clearError, causeMessage, clearMessage } = displaySlice.actions
export default displaySlice.reducer
