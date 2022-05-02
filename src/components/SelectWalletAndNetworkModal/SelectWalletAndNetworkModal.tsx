import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import metamaskLogo from '../../assets/img/wallects/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallects/wallet-connect.svg'
import imTokenLogo from '../../assets/img/wallects/imtoken.svg'
import Modal, { ModalProps } from '../Modal'
import ModalContent from '../ModalContent'
import { useTranslation } from 'react-i18next'
import { default as WalletCard } from './components/WalletCard'
import useAuth from '../../hooks/useAuth'
import debounce from 'debounce'
import useMobile from '../../hooks/useMobile'
import {
  getSupportedChainById,
  getWalletChain,
  persistChainIdIfNeeded,
  supportedChainId,
} from '../../utils/formatWallet'
import { clearUpWalletConnect, isImTokenWallet, rememberConnetor } from '../../utils/walletProvider'

const SelectWalletAndNetworkModal: React.FC<ModalProps> = ({ onDismiss, maxWidth = 400 }) => {
  const { t } = useTranslation()

  const isMobile = useMobile()
  const currentChain = getWalletChain()
  const [network, setNetwork] = useState(currentChain.chainId)
  const [clicked, setClicked] = useState(false)
  const setClickedDebounced = debounce(setClicked, 1000)

  const { account, status } = useWallet()
  const { login } = useAuth()

  const isImToken = isImTokenWallet()

  useEffect(() => {
    if (account && onDismiss) {
      onDismiss?.()
    }
  }, [account, onDismiss])

  useEffect(() => {
    if (clicked && status === 'error' && onDismiss) {
      onDismiss?.()
    }
  }, [status, clicked, onDismiss, setClickedDebounced])

  useEffect(() => {
    return () => setClickedDebounced.clear()
  }, [])

  const changeNetwork = useCallback((value) => {
    if (value === currentChain.chainId) return
    const chain = getSupportedChainById(value)
    if (chain) {
      const chainId = chain.chainId
      persistChainIdIfNeeded(Number(chainId))
      if (supportedChainId(chainId)) {
        // remove walletconnect anyway??
        clearUpWalletConnect()
        //reloading the page
        window.location.reload()
      }
    }
  }, [])

  return (
    <SelectWalletAndNetworkModalWrapper
      className={isMobile ? 'center-body' : ''}
      style={isMobile ? { width: '100%' } : { minWidth: '400px' }}
    >
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <StyledCloseIconWrapper onClick={() => onDismiss!()}>
              <i className="iconfont icon-close"></i>
            </StyledCloseIconWrapper>
            <StyledTitle>{t('actions.connect_wallet')}</StyledTitle>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={isImToken ? imTokenLogo : metamaskLogo} style={{ height: 34 }} alt="wallet_inject" />}
                onConnect={() => {
                  //connect('injected')
                  if (currentChain.chainId === network) {
                    login('injected')
                  } else {
                    rememberConnetor('injected')
                    changeNetwork(network)
                  }
                  setClickedDebounced(true)
                }}
                title={isImToken ? 'imToken' : 'Metamask'}
                desc={isImToken ? t('wallet.connect_imtoken') : t('wallet.connect_metamask')}
              />
              <WalletCard
                icon={<img src={walletConnectLogo} style={{ height: 22 }} alt="wallet_connect" />}
                onConnect={() => {
                  //connect('walletconnect')
                  if (currentChain.chainId === network) {
                    login('walletconnect')
                  } else {
                    rememberConnetor('walletconnect')
                    changeNetwork(network)
                  }
                  setClickedDebounced(true)
                }}
                title="WalletConnect"
                desc={t('wallet.connect_walletconnect')}
              />
            </StyledWalletCard>
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </SelectWalletAndNetworkModalWrapper>
  )
}

const StyledCloseIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
  .iconfont {
    font-size: 32px;
    color: #fff;
  }
`

const StyledWalletsWrapper = styled.div`
  padding: 15px 20px 30px 20px;
  position: relative;
`

const StyledWalletCard = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`

const StyledTitle = styled.p`
  padding-top: 19px;
  margin-top: -20px;
  margin-bottom: 34px;
  margin-left: -5px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  line-height: 20px;
  text-align: left;
`

const SelectWalletAndNetworkModalWrapper = styled.div`
  &.center-body > div {
    justify-content: center;
    position: relative;
    max-height: initial;
    margin: 0px auto;
    max-width: calc(100% - 40px);
  }
`

export default SelectWalletAndNetworkModal
