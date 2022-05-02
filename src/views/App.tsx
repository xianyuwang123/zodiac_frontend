import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'
import { Affix } from 'antd'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme as theme } from '../theme'

import ModalsProvider from '../contexts/Modals'
import TransactionProvider from '../contexts/Transactions'
import AppProvider from '../contexts/AppProvider'
import CloudflareProvider from '../contexts/Cloudflare'

import TopBar from '../components/TopBar'
import Fallback from '../components/Fallback'

import { getWalletChainId } from '../utils/formatWallet'
import { getChainNetwork } from '../utils/constant'
import { clearUpWalletConnect } from '../utils/walletProvider'
import detectEthereumProvider from '@metamask/detect-provider'

import Home from './Home'
import Account from './Account'
import Mining from './Mining'

import './App.css'

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Providers>
        <Router>
          <Switch>
            <StyleLayout>
              <Affix offsetTop={0} className="bunny-affix">
                <StyledHeader>
                  <TopBar />
                </StyledHeader>
              </Affix>
              <StyledContent>
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route path="/account" exact>
                    <Account />
                  </Route>
                  <Route path="/mining" exact>
                    <Mining />
                  </Route>
                  <Route path="*">
                    <Home />
                  </Route>
                </Switch>
              </StyledContent>
            </StyleLayout>
          </Switch>
        </Router>
      </Providers>
    </Suspense>
  )
}

const Providers: React.FC = ({ children }) => {
  clearUpWalletConnect()

  const defaultRpcUrl = 'https://mainnet.eth.aragon.network/'
  const [chainId, setChainId] = useState(getWalletChainId())
  const [networkRpcUrl, setNetworkRpcUrl] = useState(defaultRpcUrl)

  const { ethereum } = window

  const detectEthereum = async () => {
    await detectEthereumProvider()
  }

  useEffect(() => {
    detectEthereum()
    //console.info('reload ethereum...', ethereum)
    setChainId(getWalletChainId())
    const network = getChainNetwork(chainId)
    setNetworkRpcUrl(network ? network?.rpcUrls?.[0] : defaultRpcUrl)
  }, [ethereum])

  return (
    <ThemeProvider theme={theme}>
      <CloudflareProvider>
        <UseWalletProvider
          chainId={chainId}
          connectors={{
            walletconnect: { rpcUrl: networkRpcUrl ?? defaultRpcUrl },
          }}
        >
          <AppProvider>
            <TransactionProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </TransactionProvider>
          </AppProvider>
        </UseWalletProvider>
      </CloudflareProvider>
    </ThemeProvider>
  )
}

const StyleLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const StyledHeader = styled.div`
  padding: 0;
  height: unset;
  min-height: 82px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 64px;
    line-height: 64px;
    min-height: 64px;
    height: fit-content;
  }
`

const StyledContent = styled.div`
  min-height: 500px;
  flex: 1;
  margin-top: -82px;
  background-color: #271354;
`

export default App
