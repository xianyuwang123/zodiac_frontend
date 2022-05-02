import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Button, Drawer } from 'antd'
import FilterContent from './components/FilterContent'
import { useTranslation } from 'react-i18next'

const FilterDrawer: React.FC<{ setFilterCriteria: (val: any) => void }> = ({ setFilterCriteria }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState<{
    gender: string | null
    breed: string | null
    role: string | null
    rarity: string | null
    attackRange: string | null
    attackType: string | null
  }>({
    gender: null,
    breed: null,
    role: null,
    rarity: null,
    attackRange: null,
    attackType: null,
  })

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  useMemo(() => {
    if (!visible) {
      console.log('filter', filter)
      setFilterCriteria(filter)
    }
  }, [visible])

  return (
    <StyledFilterBtn>
      <StyledFilter onClick={showDrawer}>{t('market.filter')}</StyledFilter>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        style={!visible ? { transform: 'translateX(0px)' } : {}}
        className="filter-drawer"
      >
        <StyledCloseIcon onClick={onClose}>
          <i className="iconfont icon-close"></i>
        </StyledCloseIcon>
        <FilterContent filter={filter} setFilter={setFilter} />
      </Drawer>
    </StyledFilterBtn>
  )
}

const StyledFilter = styled(Button)`
  width: 60px;
  height: 30px;
  background: #242735;
  border: 2px solid #3a3e51;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777e90;
  margin-left: 5px;
  &:hover,
  &:focus {
    background: #3f38dd;
    border-color: #3f38dd;
    color: #fff;
  }
`

const StyledCloseIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 14px;
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

const StyledFilterBtn = styled.div``

export default FilterDrawer
