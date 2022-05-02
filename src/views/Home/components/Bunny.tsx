import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import BunnySale from '../../../components/BunnySale'
import BackDrawer from '../../../components/BackDrawer'
import BunnyBreed from '../../../components/BunnyBreed'
import { getBunnyImg } from '../../../zodiac/utils'
import { FEATURE_FLAGS } from '../../../utils/features'

interface BunnyProps {
  onShowOpenBunnyDrawer: () => void
  onCloseOpenBunnyDrawer: () => void
  bunnyInfos: any
}

const Bunny: React.FC<BunnyProps> = ({ onShowOpenBunnyDrawer, onCloseOpenBunnyDrawer, bunnyInfos }) => {
  const { t } = useTranslation()
  const [saleDrawer, setSaleDrawer] = useState<boolean>(false)
  const [breedDrawer, setBreedDrawer] = useState<boolean>(false)
  const bunnyImg: string = getBunnyImg(String(bunnyInfos?.petCode) ?? '100')

  const onDrawerShow = (status: string) => {
    if (status === 'sale') {
      setSaleDrawer(true)
      onCloseOpenBunnyDrawer()
    } else {
      setBreedDrawer(true)
      onCloseOpenBunnyDrawer()
    }
  }

  const onDrawerClose = (status: string) => {
    if (status === 'sale') {
      onShowOpenBunnyDrawer()
      setSaleDrawer(false)
    } else {
      setBreedDrawer(false)
      onShowOpenBunnyDrawer()
    }
  }

  return (
    <>
      <StyleDrawerTitle>{t('homePage.bunny_title')}</StyleDrawerTitle>
      <StyleDrawerDesc>
        {t('homePage.bunny_desc', { gender: bunnyInfos.gender === 0 ? 'female' : 'male' })}
      </StyleDrawerDesc>
      <StyledBunnyImg src={bunnyImg}></StyledBunnyImg>
      <StyledButtonArea>
        <Button
          className="sale"
          onClick={() => {
            onDrawerShow('sale')
          }}
        >
          {t('homePage.sale')}
        </Button>
        <Button
          disabled={FEATURE_FLAGS.DISABLED.BREED}
          className="breed"
          onClick={() => {
            onDrawerShow('breed')
          }}
        >
          {t('homePage.breed')}
        </Button>
      </StyledButtonArea>
      <BackDrawer
        className="saleBunny-drawer"
        visible={saleDrawer}
        onCloseDrawer={() => {
          onDrawerClose('sale')
        }}
        children={
          <BunnySale
            bunnyToken={bunnyInfos?.petToken}
            onDrawerClose={() => {
              onDrawerClose('sale')
              onCloseOpenBunnyDrawer()
            }}
          />
        }
      />
      <BackDrawer
        className="breedBunny-drawer"
        visible={breedDrawer}
        onCloseDrawer={() => {
          onDrawerClose('breed')
        }}
        children={
          <BunnyBreed
            onDrawerClose={() => {
              onDrawerClose('breed')
            }}
          />
        }
      />
    </>
  )
}

const StyledButtonArea = styled.div`
  margin-top: 20px;
  display: flex;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 115px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  .sale {
    background: #ff6609;
    border-color: #ff6609;
    color: #fff;
  }
  .breed {
    /*background: #37ae45;
    border-color: #37ae45;*/
    margin-left: 10px;
    /*color: #fff;*/
  }
`

const StyledBunnyImg = styled.img`
  width: 164px;
  // height: 134px;
  object-fit: cover;
  margin-top: 20px;
`

const StyleDrawerDesc = styled.span`
  font-size: 18px;
  font-weight: 500;
`

const StyleDrawerTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-top: 32px;
`

export default Bunny
