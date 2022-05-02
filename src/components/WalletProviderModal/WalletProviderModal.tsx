import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'
import imTokenLogo from '../../assets/img/imtoken.svg'
import ontoLogo from '../../assets/img/onto.svg'
import coin98Logo from '../../assets/img/coin98.png'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import Separator from '../Separator'

import { useTranslation } from 'react-i18next'

import { default as WalletCard } from './components/WalletCard2'

import useAuth from '../../hooks/useAuth'

import debounce from 'debounce'

import { isImTokenWallet } from '../../utils/walletProvider'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss, maxWidth = 400 }) => {
  const { t } = useTranslation()

  const [clicked, setClicked] = useState(false)
  const setClickedDebounced = debounce(setClicked, 1000)

  const { account, connect, status } = useWallet()
  const { login, logout } = useAuth()

  const isImToken = isImTokenWallet()

  useEffect(() => {
    if (account && onDismiss) {
      onDismiss!()
    }
  }, [account, onDismiss])

  useEffect(() => {
    if (clicked && status === 'error' && onDismiss) {
      onDismiss!()
    }
  }, [status, clicked, onDismiss, setClickedDebounced])

  useEffect(() => {
    return () => setClickedDebounced.clear()
  }, [])

  return (
    <div className="base-body">
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={isImToken ? imTokenLogo : metamaskLogo} style={{ height: 45 }} alt="wallet_inject" />}
                onConnect={() => {
                  //connect('injected')
                  login('injected')
                  setClickedDebounced(true)
                }}
                title={isImToken ? 'imToken' : 'Metamask'}
                desc={isImToken ? t('wallet.connect_imtoken') : t('wallet.connect_metamask')}
              />
            </StyledWalletCard>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={walletConnectLogo} style={{ height: 45 }} />}
                onConnect={() => {
                  //connect('walletconnect')
                  login('walletconnect')
                  setClickedDebounced(true)
                }}
                title="WalletConnect"
                desc={t('wallet.connect_walletconnect')}
              />
            </StyledWalletCard>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={ontoLogo} style={{ height: 45 }} />}
                onConnect={() => {
                  //connect('walletconnect')
                  login('injected')
                  setClickedDebounced(true)
                }}
                title="ONTO"
                desc={t('wallet.connect_onto')}
              />
            </StyledWalletCard>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={coin98Logo} style={{ height: 45 }} />}
                onConnect={() => {
                  //connect('walletconnect')
                  login('injected')
                  setClickedDebounced(true)
                }}
                title="Coin98"
                desc={t('wallet.connect_coin98')}
              />
            </StyledWalletCard>
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </div>
  )
}

const StyledWalletsWrapper = styled.div`
  padding: 20px 20px 30px 20px;
  position: relative;
  display: flex;
  //flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledWalletCard = styled.div`
  width: 45%;
  margin: 14px;
  //flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 50%;
    margin: 0;
  }
`

export default WalletProviderModal
