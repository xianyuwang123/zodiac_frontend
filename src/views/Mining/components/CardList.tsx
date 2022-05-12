import React, { useMemo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useCardList } from '../../../hooks/useCardList'
import NFTCard from '../../../components/NFTCard/NFTCard4'
import useMobile from '../../../hooks/useMobile'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import debounce from 'debounce'

const CardWidth = 170

const CardList: React.FC = () => {
  const { t } = useTranslation()
  const isMobile = useMobile()
  const listInfo = useCardList()
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const columns = useMemo(() => {
    return parseInt(String(window.innerWidth / (CardWidth + (isMobile ? 5 : 20))))
  }, [window.innerWidth])

  const onPressEnter = useCallback(
    (e) => {
      setSearchValue(e.target.value)
    },
    [inputValue]
  )
  const onChangeSearchInput = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])
  const onChangeDebounced = debounce(onChangeSearchInput, 500)

  const filterList = useMemo(() => {
    if (searchValue !== '' && listInfo) {
      const keyword = searchValue.toUpperCase()
      return listInfo.filter((card) => {
        const zodiacName = parseInt(String(parseInt(card.zgIndex) / 10))
        const nameList = [
          'DRAGON LONG 龙',
          'TIGER HU 虎',
          'SNAKE SHE 蛇',
          'DOG GOU 狗',
          'HORSE MA 马',
          'OX NIU 牛',
          'MONKEY HOU 猴',
          'GOAT YANG 羊',
          'ROOSTER JI 鸡',
          'PIG ZHU 猪',
          'RABBIT TU 兔',
          'RAT SHU 鼠',
        ]
        return (
          `${`0000000${card?.tokenId ? card.tokenId : '0'}`.slice(-6)}`.includes(keyword) ||
          nameList[zodiacName].includes(keyword)
        )
      })
    }
    return listInfo
  }, [searchValue, listInfo])

  return (
    <>
      <StyledSearch>
        <div>{`${filterList ? filterList?.length : '0'} NFT`}</div>
        <Input
          suffix={<SearchOutlined style={{ color: '#ffffff' }} />}
          placeholder={t('accountPage.search_assets')}
          className="query-assets-input"
          allowClear
          bordered={true}
          onChange={(e) => {
            /* signal to React not to nullify the event object */
            e.persist()
            setInputValue(e.target.value)
            onChangeDebounced(e)
          }}
          onPressEnter={onPressEnter}
          value={inputValue}
        />
      </StyledSearch>
      <StyledCardList columns={columns}>
        {filterList
          ? filterList.map((cardInfo: any, i) => {
              return <NFTCard cardInfo={cardInfo} key={i} />
            })
          : null}
      </StyledCardList>
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
`

const StyledSearch = styled.div`
  display: flex;
  align-items: ;
  .ant-input-search.query-assets-input {
    .ant-input-prefix {
      margin-right: 16px;
    }
  }
  .ant-input-affix-wrapper.query-assets-input {
    background: #1d2633;
    box-shadow: none;
    height: 34px;
    border-radius: 10px 10px 10px 10px;
    opacity: 1;
    border: 1px solid #29374b;
    &:hover,
    &:focus {
      border-color: #29374b;
    }
    .ant-input-prefix {
      margin-right: 16px;
    }
    .ant-input {
      background: #1d2633;
      color: #ffffff;
    }
  }
  & > div {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #ffffff;
    line-height: 24px;
    margin-right: 20px;
    line-height: 34px;
    white-space: pre;
  }
`

export default CardList
