import BigNumber from 'bignumber.js/bignumber'
import { TokenChainAddressList } from '../../types'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935'), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const tokenMap: TokenChainAddressList = {
  WETH: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    5: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    42: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    66: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', // WOKT
    1337: '0x9E8E71f9cC645D115D4ae3801C06c272386B9e86',
  },
  USDT: {
    1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    5: '0xB2E9532A4D1a9d218f41c7C7B2E7A1cAc5055efF',
    56: '0x55d398326f99059fF775485246999027B3197955',
    66: process.env.REACT_APP_USDT_ADDRESS,
    97: '0x3d0326410B5ac44889C9682D6A6ba7273293C4d9',
    1337: '0xD967e25660277a903EC6C2Ff4B1BA803b3878216',
  },
  WBTC: {
    1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  },
  UDI: {
    56: '0xaa3b29437457cf9d995cffd06c45e0b2b37cf171',
    97: '0x92a5e28cedEE3f6542E2Bb4c888A8dcd8928205b',
  },
  UDP: {
    56: '0xBaA96ff6FD02010e3eE5a86d2Bb7c62e6Ce811DD',
    97: '0x69a36E3F40ec0D1D88935cc936f91539097C7Ba1',
  },
}

export const contractAddresses: TokenChainAddressList = {
  weth: {
    1: tokenMap.WETH[1],
    5: tokenMap.WETH[5],
    42: tokenMap.WETH[42],
    56: tokenMap.WETH[56],
    66: tokenMap.WETH[66],
    1337: tokenMap.WETH[1337],
  },
  zodiac: {
    56: '0x006032cA77747e6E390dee97f9E54E8623772509',
    97: '0xB70f720B4ba3bBAD0dce58C64134d7aF0F51a009',
  },
  zodiacViewHelper: {
    56: '0x2b1011Be4F5Ee795B3610AE05aAfFD34eA68cE6d',
    97: '0xFFe540e61dE2BA64f260B38784ad30C64ea4928d',
  },
  zodiacLand: {
    97: '0x0812C64feec4475EE75c78f0276Ac9cdF4899AD3',
  },
  multicall: {
    1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    42: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    4: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    5: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    3: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    56: '0xB6f21B038391A0F379b7F11F21509e055CB7dD79',
    97: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    100: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  },
  usdt: {
    1: tokenMap.USDT[1],
    5: tokenMap.USDT[5],
    56: tokenMap.USDT[56],
    66: tokenMap.USDT[66],
    97: tokenMap.USDT[97],
    1337: tokenMap.USDT[1337],
  },
  udi: {
    56: tokenMap.UDI[56],
    97: tokenMap.UDI[97],
  },
  udp: {
    56: tokenMap.UDP[56],
    97: tokenMap.UDP[97],
  },
}
