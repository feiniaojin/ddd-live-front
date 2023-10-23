import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import styles from './App.module.scss'
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from 'antd'
const MainView = React.lazy(() => import('@/router/index'))
export default function App() {

  console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)

  return (
      <div className={styles.app}>
          <ConfigProvider locale={zhCN}>

        <Router >
            <MainView />
        </Router>
        </ConfigProvider>

      </div>

  )
}
