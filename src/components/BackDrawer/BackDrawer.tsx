import React from 'react'
import styled from 'styled-components'
import { Button, Drawer } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'

interface BackDrawerProps {
  visible: boolean
  onCloseDrawer: () => void
  children: React.ReactNode
  className: string
}

const BackDrawer: React.FC<BackDrawerProps> = ({ visible, onCloseDrawer, children, className }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  return (
    <Drawer placement="bottom" closable={false} onClose={onCloseDrawer} visible={visible} className={className}>
      <StyledBackIcon onClick={onCloseDrawer}>
        <i className="iconfont icon-xiangzuo"></i>
      </StyledBackIcon>
      {children}
    </Drawer>
  )
}

const StyledBackIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
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

export default BackDrawer
