// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require('craco-less')

// see
// https://ant.design/docs/react/customize-theme
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@btn-primary-color': '#333333',
              '@btn-border-radius-base': '8px',
              '@btn-border-radius-sm': '8px',
              '@link-color': '#333333',
              '@link-hover-color': '#848484',
              '@menu-item-color': '#333333',
              '@dropdown-selected-color': '#000000',
              '@layout-body-background': 'transparent',
              '@layout-header-background': 'transparent',
              '@layout-header-height': '102px',
              '@height-lg': '48px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
