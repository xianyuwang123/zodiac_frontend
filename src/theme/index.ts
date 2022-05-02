import { black, green, grey, red, white, dark, yellow, blue } from './colors'

export const lightTheme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 576,
    xsMobile: 480,
  },
  color: {
    yellow,
    black,
    grey,
    green,
    dark,
    blue,
    primary: {
      light: red[200],
      main: yellow[100],
      bg: '#fafafa',
    },
    secondary: {
      main: green[500],
    },
    white,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
}
