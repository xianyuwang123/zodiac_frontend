import React, { useState, useEffect } from 'react'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'

import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import useMobile from '../../../hooks/useMobile'

interface WalletCard2Props {
  icon: React.ReactNode
  onConnect: () => void
  title: string
  desc: string
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const WalletCard2: React.FC<WalletCard2Props> = ({ icon, onConnect, title, desc }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  const [pending, setPending] = useState(false)

  let timer: ReturnType<typeof setTimeout>

  useEffect(() => {
    return () => timer && clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardContent>
        <StyledContent
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
            <CardTitle text={title} size={isMobile ? 16 : 20} bold={true} color={'#333'} />
            {isMobile ? null : <CardTitle text={desc} size={16} color={'#999'} />}
          </Spin>
        </StyledContent>
      </CardContent>
    </Card>
  )
}

const StyledContent = styled.div`
  cursor: pointer;
`

export default WalletCard2
