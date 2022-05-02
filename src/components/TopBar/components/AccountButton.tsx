import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { formatAddress } from '../../../utils/formatAddress'
import useAuth from '../../../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import WalletImg from '../../../assets/img/zodiac/side/wallet.png'
import LogoutImg from '../../../assets/img/zodiac/side/logout.png'

const AccountButton: React.FC<{ isSidebar: boolean; onSignout?: any }> = ({ isSidebar, onSignout }) => {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const { account, reset } = useWallet()
  const { logout } = useAuth()

  useEffect(() => {
    if (account) {
      setAddress(formatAddress(account, isSidebar ? 8 : 6, -4))
    }
  }, [account])

  const handleSignOutClick = useCallback(() => {
    if (logout) {
      logout?.()
      onSignout?.()
    }
    reset?.()
  }, [logout, reset, isSidebar])

  return (
    <StyledAccountButton>
      <StyledAccount className={isSidebar ? '' : 'account'}>
        <StyledAccountLeft>
          <StyledWallet className={isSidebar ? '' : 'account'} src={WalletImg} />
          <span>{address}</span>
        </StyledAccountLeft>
        {account && isSidebar ? <StyledSignOutText src={LogoutImg} onClick={handleSignOutClick} /> : null}
      </StyledAccount>
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  width: 100%;
`

const StyledAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  font-size: 18px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #ffffff;
  background: transparent;
  height: 65px;
  line-height: 65px;
  &.account {
    width: fit-content;
    padding: 0 6px;
    height: 26px;
    line-height: 24px;
    border-radius: 90px 90px 90px 90px;
    font-size: 12px;
    font-family: 'Poppins-SemiBold', 'Poppins';
    font-weight: 600;
    color: #ffffff;
    border: 1px solid #ffffff;
    & > span {
      transform: scale(0.9);
    }
  }
`

const StyledAccountLeft = styled.div`
  display: flex;
  align-items: center;
`

const StyledSignOutText = styled.img`
  height: 30px;
  margin-top: -4px;
  cursor: pointer;
`

const StyledWallet = styled.img`
  margin-right: 15px;
  margin-left: 16px;
  height: 22px;
  &.account {
    margin-left: 2px;
    height: 14px;
    margin-right: 4px;
  }
`

export default AccountButton
