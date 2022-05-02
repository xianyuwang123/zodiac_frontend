export const formatAddress = (address: string, start = 6, end = -6): string => {
  return address ? address.slice(0, start) + '...' + address.slice(end) : ''
}
