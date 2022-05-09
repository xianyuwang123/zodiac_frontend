import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'
import BackDrawer from '../BackDrawer'
import { useCardList } from '../../hooks/useCardList'
import NFTCard3 from '../NFTCard/NFTCard3'
import CardBreed from '../CardBreed'
import { Card } from '../../types/Card'
import BigNumber from 'bignumber.js/bignumber'

interface SelectProps {
  onDrawerClose: () => void
  firstCardInfo: Card
}

const CardWidth = 170

const CardSelect: React.FC<SelectProps> = ({ onDrawerClose, firstCardInfo }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()
  const listInfo = useCardList()
  const [lastCardInfo, setLastCardInfo] = useState<undefined | Card>(undefined)
  const columns = useMemo(() => {
    return parseInt(String(window.innerWidth / (CardWidth + (isMobile ? 5 : 20))))
  }, [window.innerWidth])

  const filterList = useMemo(() => {
    if (listInfo) {
      return listInfo
        .filter((card) => card.tokenId !== firstCardInfo.tokenId)
        .filter((card) => firstCardInfo.zgLevel === card.zgLevel)
        .filter((card) => new BigNumber(parseInt(String(new Date().getTime() / 1000))).gt(card.breedCoolDown))
    }
    return listInfo
  }, [listInfo])

  const [drawerShow, setDrawerShow] = useState<boolean>(false)

  const onLastCardInfo = useCallback(
    (cardInfo: Card) => {
      setLastCardInfo(cardInfo)
      onDrawerClose()
      setDrawerShow(true)
    },
    [onDrawerClose]
  )

  return (
    <>
      <StyledContent>
        <StyledCardList columns={columns}>
          {filterList
            ? filterList.map((cardInfo: any, i) => {
                return (
                  <CardWrapper
                    onClick={() => {
                      onLastCardInfo(cardInfo)
                    }}
                    key={i}
                  >
                    <NFTCard3 cardInfo={cardInfo} />
                  </CardWrapper>
                )
              })
            : null}
        </StyledCardList>
      </StyledContent>
      <BackDrawer
        className="breed-drawer"
        visible={drawerShow}
        onCloseDrawer={() => {
          setDrawerShow(false)
        }}
        onBackDrawer={() => {
          setDrawerShow(false)
        }}
        children={
          <CardBreed
            onDrawerBack={() => {
              onDrawerClose()
            }}
            onDrawerClose={() => {
              setDrawerShow(false)
            }}
            firstCardInfo={firstCardInfo}
            lastCardInfo={lastCardInfo}
          />
        }
      />
    </>
  )
}

interface StyledCardListProps {
  columns: number
}

const StyledCardList = styled.div<StyledCardListProps>`
  margin-top: 12px;
  min-height: calc(100vh - 544px);
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: 5px;
  width: 100%;
  display: grid;
  margin-bottom: 20px;
`

const StyledContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 14px 20px;
  margin-top: 10px;
  width: 100%;
  height: 523px;
  overflow-y: scroll;
`

const CardWrapper = styled.div``

export default CardSelect
