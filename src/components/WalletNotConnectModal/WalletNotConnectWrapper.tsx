import React, { useEffect } from 'react'
import useModal from '../../hooks/useModal'
import WalletNotConnectModal from '../WalletNotConnectModal'
import { useWallet } from 'use-wallet'

const WalletNotConnectWrapper: React.FC = () => {
  const { error } = useWallet()

  const [onWalletNotConnectModal, onDismiss] = useModal(<WalletNotConnectModal />, 'ErrorTip')

  useEffect(() => {
    if (error) {
      onWalletNotConnectModal()
    } else {
      onDismiss()
    }
  }, [error])

  return <></>
}

export default WalletNotConnectWrapper
