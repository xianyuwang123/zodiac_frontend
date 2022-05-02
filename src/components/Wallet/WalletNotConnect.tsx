import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useWallet, ChainUnsupportedError } from 'use-wallet'

import { useTranslation } from 'react-i18next'

import { Alert } from 'antd'

import { getWalletChain } from '../../utils/formatWallet'

const WalletNotConnect: React.FC = () => {
  const { t } = useTranslation()
  const chain = getWalletChain()
  const { error } = useWallet()

  const [title, secondary] = useMemo(() => {
    if (error instanceof ChainUnsupportedError) {
      return [t('wallet.error_title1'), t('wallet.error_desc1', { chainName: chain.chainName })]
    }
    return [t('wallet.error_title2'), t('wallet.error_desc2')]
  }, [error, chain, t])

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        padding: '24px 0px',
        flexDirection: 'column',
      }}
    >
      <h2>{t('prompt.connect_wallet')}</h2>
      {!!error && <Alert message={`${title} ${secondary}`} type="error" />}
    </div>
  )
}

export default WalletNotConnect
