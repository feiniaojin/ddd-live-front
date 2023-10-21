import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import styles from './App.module.scss'

const MainView = React.lazy(() => import('@/router/index'))
export default function App() {

  console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)

  return (
      <div className={styles.app}>
        <Router >
            <MainView />
        </Router>
      </div>

  )
}
