import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

const fmt = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
}

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
  FORMAT: fmt,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

export const ZERO_BIGNUMBER = new BigNumber(0)
export const ONE_BIGNUMBER = new BigNumber(1)
export const TEN_BIGNUMBER = new BigNumber(10)
export const ONE_HUNDRED_BIGNUMBER = new BigNumber(100)

export const SIL_PER_YEAR = new BigNumber(process.env.REACT_APP_TOKEN_PER_YEAR)

export const BEST_ESTIMATED_GAS = Number(1000000)

export const getWethContract = (dApp) => {
  return dApp && dApp.contracts && dApp.contracts.weth
}

export const getMulticallContract = (dApp) => {
  return dApp && dApp.contracts && dApp.contracts.multicall
}

export const getZodiacContract = (dApp) => {
  return dApp && dApp.contracts && dApp.contracts.zodiac
}

export const getZodiacViewHelperContract = (dApp) => {
  return dApp && dApp.contracts && dApp.contracts.zodiacViewHelper
}

export const getWeb3 = (dApp) => {
  return dApp?.web3
}

export const decodeParameter = (dApp, type, hexString) => {
  return dApp?.web3?.eth.abi.decodeParameter(type, hexString)
}

export const decodeParameters = (dApp, typesArray, hexString) => {
  return dApp?.web3?.eth.abi.decodeParameters(typesArray, hexString)
}

export const getEthBalance = async (dApp, account) => {
  return await dApp.web3.eth.getBalance(account)
}

export function calculateGasMargin(value) {
  const bestGas =
    Number(value) <= BEST_ESTIMATED_GAS
      ? Number(new BigNumber(value).multipliedBy(new BigNumber(1.2)).toFixed(0))
      : Number(value)
  return bestGas
}

export const aggregateCalls = async (multicallContract, calls) => {
  return await multicallContract.methods.aggregate(calls).call()
}

export const queryPricePerBunny = async (zodiacContract, account) => {
  try {
    const price = await zodiacContract.methods.pricePerBunny().call(account)
    return new BigNumber(price)
  } catch (e) {
    console.error(e)
  }
}

export const queryRemainCount = async (zodiacContract, account) => {
  try {
    const { total, adopted } = await zodiacContract.methods.adoptedCount().call(account)
    const remainCount = Number(total) - Number(adopted)
    return remainCount
  } catch (e) {
    console.error(e)
  }
}

export const getDepositRate = async (carrotTownContract, account) => {
  try {
    const { bacAmount, carrotAmount } = await carrotTownContract.methods.depositRate().call(account)
    const depositRate = parseInt(carrotAmount) / parseInt(bacAmount)
    return depositRate
  } catch (e) {
    console.error(e)
  }
}

export const approve = async (lpContract, zodiacMaster, account) => {
  return lpContract.methods
    .approve(zodiacMaster.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const adoptBunny = async (zodiacContract, account) => {
  return zodiacContract.methods.adoptBunny().send({ from: account })
}

export const sale = async (zodiacContract, bunnyid, amount, account) => {
  let gas = BEST_ESTIMATED_GAS
  try {
    gas = await zodiacContract.methods
      .saleBunny(bunnyid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .estimateGas({ from: account })
  } catch (error) {
    console.log(error)
    throw error
  }

  return zodiacContract.methods
    .saleBunny(bunnyid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, gas: calculateGasMargin(gas) })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const cancle = async (zodiacContract, bunnyid, account) => {
  let gas = BEST_ESTIMATED_GAS
  try {
    gas = await zodiacContract.methods.cancleSaleBunny(bunnyid).estimateGas({ from: account })
  } catch (error) {
    console.log(error)
    throw error
  }

  return zodiacContract.methods
    .cancleSaleBunny(bunnyid)
    .send({ from: account, gas: calculateGasMargin(gas) })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const buyBunny = async (zodiacContract, bunnyid, expectedPrice, account) => {
  if (!zodiacContract) return

  let gas = BEST_ESTIMATED_GAS
  try {
    gas = await zodiacContract.methods.buyBunnyExact(bunnyid, expectedPrice).estimateGas({ from: account })
  } catch (error) {
    console.log(error)
    throw error
  }

  return zodiacContract.methods
    .buyBunnyExact(bunnyid, expectedPrice)
    .send({ from: account, gas: calculateGasMargin(gas) })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getBunnyImg = (bunnyImgName) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`../assets/img/bunnyArmy/bunnies_list/unit-${bunnyImgName}.png`).default
  } catch (error) {
    console.error(`Unable find the img ${bunnyImgName}...`, error)
  }
}

export const getBunnyQualityImg = (bunnyImgName) => {
  if (!bunnyImgName) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`../assets/img/bunnyArmy/main/${bunnyImgName.toLowerCase()}.png`).default
  } catch (error) {
    console.error(`Unable find the img ${bunnyImgName}...`, error)
  }
}

export const accountStake = async (tokenStake, amount, account) => {
  try {
    !!amount &&
      (await tokenStake.methods)
        .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
        .estimateGas()
  } catch (error) {
    return error
  }

  return (
    amount &&
    tokenStake.methods
      .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  )
}
