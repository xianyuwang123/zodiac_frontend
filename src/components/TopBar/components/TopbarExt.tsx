import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Button, Drawer, Menu } from 'antd'
import SideBar from '../../../components/SideBar'
import MenuImg from '../../../assets/img/zodiac/home/menu.png'

const TopbarExt: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const { account } = useWallet()

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <StyledTopbarExt>
      <StyledTopbarBtn>
        <Button
          className="dapp-topbar-btn"
          shape="circle"
          icon={<img style={{ width: '32px' }} src={MenuImg} />}
          onClick={showDrawer}
        />
        <Drawer
          width={305}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          style={!visible ? { transform: 'translateX(0px)' } : {}}
          className="menu-drawer"
        >
          <StyledCloseIcon onClick={onClose}>
            <i className="iconfont icon-close"></i>
          </StyledCloseIcon>
          <SideBar onSignout={onClose} />
        </Drawer>
      </StyledTopbarBtn>
    </StyledTopbarExt>
  )
}

const StyledNetwordSelectWrapper = styled.div`
  width: 140px;
  margin: 20px auto;
`

const StyledLangWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 14px;
  cursor: pointer;
`

const StyledCloseIcon = styled.span`
  position: absolute;
  left: 32px;
  top: 48px;
  cursor: pointer;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 38px;
    color: #fff;
  }
`

const StyledTopbarExt = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledTopbarBtn = styled.div`
  display: flex;
  .dapp-topbar-btn:hover,
  .dapp-topbar-btn:focus {
    background: transparent;
  }
  .dapp-topbar-btn.ant-btn-circle {
    width: 36px;
    height: 36px;
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 40px;
    }
  }
  .display-search-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .display-search-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 500ms, transform 500ms;
  }
  .display-search-exit {
    opacity: 1;
  }
  .display-search-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 500ms, transform 500ms;
  }
`

export default TopbarExt
