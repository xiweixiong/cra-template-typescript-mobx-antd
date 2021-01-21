import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import store from './store'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { ConfigProvider as AntdProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import './themes/index.less'

import { ThemeProvider } from 'styled-components'
import { _default } from './themes'

import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('zh-cn')

ReactDOM.render(
  // <React.StrictMode>
  <MobxProvider {...store}>
    <AntdProvider locale={zhCN}>
      <ThemeProvider theme={_default}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </AntdProvider>
  </MobxProvider>,
  // </React.StrictMode>
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
