import { createSlice } from '@reduxjs/toolkit'

interface DisplayState {
  error: boolean
  errorMessage: string
  message: boolean
  messageText: string
}

const initialState: DisplayState = {
  error: false,
  errorMessage: '',
  message: false,
  messageText: ''
}

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    causeError(state, args) {
      state.error = true
      state.errorMessage = args.payload.errorMessage
    },
    clearError(state) {
      state.error = false
      state.errorMessage = ''
    },
    causeMessage(state, args) {
      state.message = true
      state.messageText = args.payload
    },
    clearMessage(state) {
      state.message = false
      state.messageText = ''
    }
  }
})

export const { causeError, clearError, causeMessage, clearMessage } = displaySlice.actions
export default displaySlice.reducer
