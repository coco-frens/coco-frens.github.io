import { configureStore } from '@reduxjs/toolkit'
import mathReducer from '../features/math/math-slice'
import web3Reducer from '../features/web3/web3-slice'
import displayReducer from '../features/display-slice'

export const store = configureStore({
  reducer: {
    math: mathReducer,
    web3: web3Reducer,
    display: displayReducer
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleWare().concat(web3Slice.middleware)
  // }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
