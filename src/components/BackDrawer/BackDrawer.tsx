import React from 'react'
import styled from 'styled-components'
import { Button, Drawer } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'

interface BackDrawerProps {
  visible: boolean
  onCloseDrawer: () => void
  onBackDrawer: () => void
  children: React.ReactNode
  className: string
}

const BackDrawer: React.FC<BackDrawerProps> = ({ visible, onBackDrawer, onCloseDrawer, children, className }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  return (
    <Drawer placement="bottom" closable={false} onClose={onCloseDrawer} visible={visible} className={className}>
      <StyledBackIcon onClick={onBackDrawer}>
        <i className="iconfont icon-xiangzuo"></i>
      </StyledBackIcon>
      <StyledTitle>{className === 'turntable-drawer' ? '' : 'Breek'}</StyledTitle>
      <StyledCloseIcon onClick={onCloseDrawer}>
        <i className="iconfont icon-close"></i>
      </StyledCloseIcon>
      {children}
    </Drawer>
  )
}

const StyledBackIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 24px;
    color: #fff;
  }
`

const StyledTitle = styled.div`
  font-size: 18px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #f2f2f2;
  margin-top: 23px;
  text-align: center;
`

const StyledCloseIcon = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 32px;
    color: #fff;
  }
`

export default BackDrawer
