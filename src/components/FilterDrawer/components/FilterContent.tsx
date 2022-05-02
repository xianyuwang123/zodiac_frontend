import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Checkbox } from 'antd'

import maleBunny from '../../../assets/img/bunnyArmy/main/male.png'
import femaleBunny from '../../../assets/img/bunnyArmy/main/female.png'
import SUPERIOR from '../../../assets/img/bunnyArmy/main/superior.png'
import EPIC from '../../../assets/img/bunnyArmy/main/epic.png'
import NORMAL from '../../../assets/img/bunnyArmy/main/normal.png'
import RARE from '../../../assets/img/bunnyArmy/main/rare.png'
import { useTranslation } from 'react-i18next'

type OptionVal = string[] | undefined
type FilterOpations = {
  gender?: OptionVal
  breed?: OptionVal
  role?: OptionVal
  rarity?: OptionVal
  attackRange?: OptionVal
  attackType?: OptionVal
}

const FilterContent: React.FC<{
  filter: {
    gender: string | null
    breed: string | null
    role: string | null
    rarity: string | null
    attackRange: string | null
    attackType: string | null
  }
  setFilter: (val: any) => void
}> = ({ filter, setFilter }) => {
  const { account } = useWallet()
  const { t } = useTranslation()

  const [filterVals, setFilterVals] = useState<FilterOpations>()

  const Male = (
    <>
      {t('market.male')}
      <StyledGender src={maleBunny} />
    </>
  )
  const Female = (
    <>
      {t('market.female')}
      <StyledGender src={femaleBunny} />
    </>
  )
  const options = {
    gender: [
      { label: Male, value: 'male' },
      { label: Female, value: 'female' },
    ],
    bred: [
      { label: t('market.yes'), value: 'yes' },
      { label: t('market.no'), value: 'no' },
    ],
    role: [
      { label: t('market.tank'), value: 'tank' },
      { label: t('market.attacker'), value: 'attacker' },
    ],
    attackType: [
      { label: t('market.single'), value: 'single' },
      { label: t('market.area'), value: 'area' },
    ],
    attackRange: [
      { label: t('market.melee'), value: 'melee' },
      { label: t('market.ranged'), value: 'ranged' },
    ],
    rarity: [
      { label: <StyledQualityImg src={NORMAL} />, value: 'normal' },
      { label: <StyledQualityImg src={RARE} />, value: 'rare' },
      { label: <StyledQualityImg src={SUPERIOR} />, value: 'superior' },
      { label: <StyledQualityImg src={EPIC} />, value: 'epic' },
    ],
  }
  function onChange(type: string, checkedValues: any) {
    console.log(type, 'type', checkedValues, 'checkedValues')
    if (type === 'rarity') {
      if (checkedValues.length === 0 || checkedValues.length === 4) {
        setFilter({ ...filter, [type]: null })
      } else {
        setFilter({ ...filter, [type]: checkedValues })
      }
    } else {
      if (checkedValues.length === 0 || checkedValues.length === 2) {
        setFilter({ ...filter, [type]: null })
      } else {
        setFilter({ ...filter, [type]: checkedValues[0] })
      }
    }
    setFilterVals({ ...filterVals, [type]: checkedValues })
  }

  const handleClearFilter = () => {
    setFilterVals(undefined)
    setFilter({
      gender: null,
      breed: null,
      role: null,
      rarity: null,
      attackRange: null,
      attackType: null,
    })
  }

  return (
    <StyledContent>
      <StyledTitle>{t('market.filter')}</StyledTitle>
      <StyledClearText onClick={handleClearFilter}>{t('market.clear')}</StyledClearText>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_gender')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.gender}
          options={options.gender}
          onChange={(val) => {
            onChange('gender', val)
          }}
        />
      </StyledItem>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_bred')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.breed}
          options={options.bred}
          onChange={(val) => {
            onChange('breed', val)
          }}
        />
      </StyledItem>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_role')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.role}
          options={options.role}
          onChange={(val) => {
            onChange('role', val)
          }}
        />
      </StyledItem>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_attackType')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.attackType}
          options={options.attackType}
          onChange={(val) => {
            onChange('attackType', val)
          }}
        />
      </StyledItem>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_attackRange')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.attackRange}
          options={options.attackRange}
          onChange={(val) => {
            onChange('attackRange', val)
          }}
        />
      </StyledItem>
      <StyledItem>
        <StyledItemTitle>{t('market.filter_rarity')}</StyledItemTitle>
        <Checkbox.Group
          value={filterVals?.rarity}
          options={options.rarity}
          onChange={(val) => {
            onChange('rarity', val)
          }}
        />
      </StyledItem>
    </StyledContent>
  )
}

const StyledClearText = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
  font-size: 16px;
  font-weight: 500;
  color: #777e90;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`

const StyledQualityImgWrapper = styled.div`
  display: flex;
`

const StyledQualityImg = styled.img`
  width: 93px;
  height: 12px;
  object-fit: contain;
  margin-top: -8px;
`

const StyledGender = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
  margin-left: 8px;
  vertical-align: initial;
`

const StyledItemTitle = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`

const StyledItem = styled.div`
  font-weight: 500;
  color: #777e90;
  margin-top: 12px;

  .ant-checkbox-group-item {
    margin-right: 0px !important;
  }
  .ant-checkbox-group {
    display: flex !important;
    flex-wrap: wrap;
  }
  .ant-checkbox-wrapper {
    color: #777e90 !important;
    flex: 1 !important;
    width: 50%;
    margin-bottom: 12px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: #3f38dd !important;
    border-color: #3f38dd !important;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    box-shadow: none !important;
  }
  .ant-checkbox-checked::after {
    border: unset !important;
  }
  .ant-checkbox-inner {
    border-radius: 2px !important;
    background: transparent !important;
    border: 2px solid #3a3e51 !important;
    width: 20px !important;
    height: 20px !important;
  }
`

const StyledTitle = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 30px;
  font-weight: 500;
  color: #fff;
`

const StyledContent = styled.div`
  margin-top: 60px;
`

export default FilterContent
