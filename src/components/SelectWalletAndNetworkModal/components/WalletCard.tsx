import React, { useState, useEffect } from 'react'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'

import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface WalletCard2Props {
  icon: React.ReactNode
  onConnect: () => void
  title: string
  desc: string
}

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />

const WalletCard: React.FC<WalletCard2Props> = ({ icon, onConnect, title, desc }) => {
  const { t } = useTranslation()

  const [pending, setPending] = useState(false)

  let timer: ReturnType<typeof setTimeout>

  useEffect(() => {
    return () => timer && clearTimeout(timer)
  }, [])

  return (
    <StyledButton
      onClick={() => {
        setPending(true)
        try {
          onConnect()
        } catch (error) {
          console.info('connect error...')
          throw error
        } finally {
          timer = setTimeout(() => {
            setPending(false)
          }, 5 * 1000)
        }
      }}
    >
      <Spin tip={t('prompt.connecting')} spinning={pending} indicator={antIcon}>
        <CardIcon>{icon}</CardIcon>
        <CardTitle text={title} size={14} color={'#fff'} />
      </Spin>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  cursor: pointer;
  border: 1px solid #262b34;
  background-color: #262b34;
  border-radius: 10px;
  color: #fff;
  height: 60px;
  &:hover,
  &:focus {
    color: #333;
    background: initial;
    border-color: initial;
  }
  & .ant-spin-container {
    text-align: left;
    padding-left: 20px;
    & > :first-child {
      display: initial;
      padding: 0;
    }
    & > :last-child {
      display: inline-block;
      padding: 0;
      vertical-align: super;
    }
  }
  & .ant-spin-text {
    color: #fff;
  }
`

export default WalletCard
