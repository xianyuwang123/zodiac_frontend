import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ChainUnsupportedError, useWallet } from 'use-wallet'
import Modal, { ModalProps } from '../Modal'
import ModalContent from '../ModalContent'
import { useTranslation } from 'react-i18next'
import debounce from 'debounce'
import useMobile from '../../hooks/useMobile'
import { CloseIcon } from '../IconImage'
import { getWalletChain } from '../../utils/formatWallet'
import { Button } from 'antd'

const WalletNotConnectModal: React.FC<ModalProps> = ({ onDismiss, maxWidth = 400 }) => {
  const { t } = useTranslation()
  const chain = getWalletChain()
  const { error } = useWallet()
  const isMobile = useMobile()
  const [clicked, setClicked] = useState(false)
  const setClickedDebounced = debounce(setClicked, 1000)

  const { account, status } = useWallet()

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

  const [title, secondary] = useMemo(() => {
    if (error instanceof ChainUnsupportedError) {
      return [
        t('wallet.error_title1'),
        t('wallet.error_desc1', { chainName: (chain.networkName ?? 'Ethereum') + ' ' + chain.chainName }),
      ]
    }
    return [t('wallet.error_title2'), t('wallet.error_desc2')]
  }, [error, chain, t])

  return (
    <WalletNotConnectModalWrapper
      className={isMobile ? 'center-body' : ''}
      style={isMobile ? {} : { minWidth: '400px' }}
    >
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <StyledCloseIconWrapper onClick={() => onDismiss!()}>
              <i className="iconfont icon-close"></i>
            </StyledCloseIconWrapper>
            <StyledTitle />
            <StyledTitle2>{!!error && `${secondary}`}</StyledTitle2>
            <StyleButton type="primary" shape="round" onClick={() => onDismiss!()}>
              {t('actions.confirm')}
            </StyleButton>
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </WalletNotConnectModalWrapper>
  )
}

const WalletNotConnectModalWrapper = styled.div`
  &.center-body > div {
    justify-content: center;
    position: relative;
    max-height: initial;
    margin: 0 auto;
    max-width: calc(100% - 40px);
  }
`

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
  position: relative;
  padding: 15px 20px 30px 20px;
`

const StyledTitle = styled.p`
  margin-bottom: 34px;
  margin-left: -5px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  line-height: 20px;
  text-align: left;
`

const StyledTitle2 = styled.p`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  line-height: 30px;
  text-align: center;
`

const StyleButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
  border-color: unset;
  &:hover,
  &:focus {
    background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
    border-color: unset;
  }
`

export default WalletNotConnectModal
