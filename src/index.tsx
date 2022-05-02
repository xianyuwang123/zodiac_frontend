import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import './index.less'

import reportWebVitals from './reportWebVitals'

import './i18n'

// yarn add vconsole
import vConsole from 'vconsole'

import { isDebugOn } from './utils/formatUrl'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)

if (isDebugOn()) {
  new vConsole()
}
