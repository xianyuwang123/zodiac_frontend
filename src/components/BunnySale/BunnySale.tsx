import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSale } from '../../hooks/useBunnyDeal'
import { useTranslation } from 'react-i18next'
import { Input as NumericalInput } from '../NumericalInput'
import { Button, notification, Space } from 'antd'
import Dots from '../Dots'
import BigNumber from 'bignumber.js/bignumber'

interface BunnySaleProps {
  bunnyToken: number
  onDrawerClose: () => void
}

const BunnySale: React.FC<BunnySaleProps> = ({ bunnyToken, onDrawerClose }) => {
  const { t } = useTranslation()
  const [penddingSale, setPendingSale] = useState(false)
  const [amount, setAmount] = useState('')
  const { onSale } = useSale()

  const handleSale = useCallback(
    async (val) => {
      setPendingSale(true)
      try {
        await onSale(bunnyToken, val)
        setPendingSale(false)
        notification['success']({
          message: 'Success',
        })
        onDrawerClose()
      } catch (error: any) {
        console.log('errpr', error)
        if (error?.code === 4001) {
          setPendingSale(false)
        } else if (error?.message) {
          console.log(error)
          if (error?.message.includes('BunnyArmy: bunny is on sale')) {
            notification['warning']({
              message: t('market.sale_message'),
            })
          } else {
            notification['error']({
              message: 'Error',
              description: error?.message,
            })
          }
        }
      } finally {
        setPendingSale(false)
      }
    },
    [bunnyToken]
  )

  return (
    <>
      <StyledSaleInputWrapper>
        <NumericalInput fixedLength={3} placeholder={t('market.enter_amount')} value={amount} onUserInput={setAmount} />
        <span>BAC</span>
      </StyledSaleInputWrapper>
      <StyleSaleButtonArea>
        <Button className="cancel" onClick={onDrawerClose}>
          {t('homePage.cancel')}
        </Button>
        <OrangeButton
          disabled={penddingSale || amount === '' || new BigNumber(amount).isZero()}
          onClick={() => {
            if (amount === '' || new BigNumber(amount).isZero()) return
            handleSale(amount)
          }}
        >
          <Dots show={penddingSale} text={t('homePage.sale')} />
        </OrangeButton>
      </StyleSaleButtonArea>
    </>
  )
}

const StyleSaleButtonArea = styled.div`
  margin-top: 60px;
  padding: 0 26px;
  display: flex;
  justify-content: center;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 155px;
    height: 50px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  .cancel {
    background: rgba(55, 174, 69, 0);
    border: 2px solid #3a3e51;
    color: #777e90;
    &:hover,
    &:focus {
      color: #777e90;
      background: rgba(55, 174, 69, 0);
      border-color: #3a3e51;
    }
  }
`

const OrangeButton = styled(Button)`
  margin-left: 14px;
  color: #fff;
  background: #ff6609 !important;
  border-color: #ff6609 !important;
  &:hover,
  &:focus {
    color: #fff;
    background: #ff6609;
    border-color: #ff6609;
  }
`

const StyledSaleInputWrapper = styled.div`
  margin: 80px 26px 0;
  display: flex;
  background: #242735;
  border: 2px solid #3a3e51;
  border-radius: 5px;
  align-items: center;
  & > input {
    flex: 1;
    width: 100%;
    color: #ffffff;
    height: 60px;
    background: #242735;
    padding: 0 10px;
    font-size: 18px;
  }
  & > span {
    color: #777e90;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
`

export default BunnySale
