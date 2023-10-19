import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'

import 'react-tooltip/dist/react-tooltip.css'

import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia],
  [publicProvider()],
)
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>,
)
