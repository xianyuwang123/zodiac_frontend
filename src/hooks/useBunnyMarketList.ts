import { useCallback, useEffect, useState } from 'react'
import useBlock from './useBlock'
import { useWallet } from 'use-wallet'
import axios from '../utils/axios'

const useBunnyMarketList = (filterCriteria = {}, pageNumber = 1, pageCount = 20, price: any) => {
  const [bunnyList, setBunnyList] = useState([])
  const [total, setTotal] = useState<null | number>(null)
  const [totalPage, setTotalPage] = useState<null | number>(null)
  const { account }: { account: string | null } = useWallet()
  const block = useBlock()
  const [refreshCount, setRefreshCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchBunnyList = useCallback(async () => {
    if (!account) return
    const data = {
      pageNo: pageNumber,
      pageSize: pageCount,
      ...filterCriteria,
      price,
    }
    setLoading(true)
    await axios
      .post('/api/nft/list', data)
      .then((res: { result: any; code?: any; total?: any; message?: any }) => {
        const { code, result, total, message } = res
        if (code === 200) {
          setBunnyList(result)
          setTotal(total)
          setTotalPage(Math.ceil(total / pageCount))
        } else {
          console.log('message', message)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [account, filterCriteria, refreshCount, pageNumber, price])

  const onRefresh = () => {
    setRefreshCount(refreshCount + 1)
  }

  useEffect(() => {
    if (account) {
      fetchBunnyList()
    }
  }, [account, filterCriteria, refreshCount, pageNumber])

  return {
    bunnyList,
    total,
    totalPage,
    onRefresh,
    loading,
  }
}

export default useBunnyMarketList
