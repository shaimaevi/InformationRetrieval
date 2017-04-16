
'use strict'

import React from 'react'
import styles from './style.scss'
import Loading from './component'

const LoadingPage = () => {
  return (
    <div className={styles.pageRoot}>
      <h3> LoadingPage Component </h3>
      <Loading />
    </div>
  )
}

export default LoadingPage
