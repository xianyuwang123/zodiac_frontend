import React, { useCallback } from 'react'
import styled from 'styled-components'
import useModal from '../../../hooks/useModal'
import SelectWalletAndNetworkModal from '../../SelectWalletAndNetworkModal'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import useMobile from '../../../hooks/useMobile'

const AccountButton: React.FC<{ onSignout?: () => void; isSidebar: boolean }> = ({ onSignout, isSidebar }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  const [onPresentWalletProviderModal] = useModal(<SelectWalletAndNetworkModal />, 'provider')

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
    onSignout?.()
  }, [onPresentWalletProviderModal, onSignout])

  return (
    <StyledAccountButton>
      <Button
        style={{ fontWeight: 'normal' }}
        onClick={handleUnlockClick}
        shape="round"
        size="large"
        className={isSidebar ? '' : 'account'}
      >
        {t('actions.connect_wallet')}
      </Button>
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  .ant-btn-round.ant-btn-lg {
    width: 250px;
    border-radius: 30px 30px 30px 30px;
    opacity: 1;
    border: 2px solid #fff;
    color: #fff;
    background: transparent;
    height: 60px;
    line-height: 38px;
    font-size: 22px;
    font-family: 'Poppins-SemiBold', 'Poppins';
    margin-top: 30px;
    &.account {
      width: 104px;
      height: 26px;
      line-height: 24px;
      border-radius: 90px 90px 90px 90px;
      font-size: 12px;
      font-family: 'Poppins-SemiBold', 'Poppins';
      font-weight: 600;
      color: #ffffff;
      padding: 0;
      border: 1px solid #ffffff;
      & > span {
        transform: scale(0.9);
      }
      margin-top: 0px;
    }
  }
`

export default AccountButton
