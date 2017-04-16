
'use strict'

import React from 'react'
import styles from './style.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Component = props => {
  return (
    <MuiThemeProvider>
      <div className={styles.root}>
        <h3> Sawasdee! App Component Here </h3>
        { props.children }
      </div>
    </MuiThemeProvider>
  )
}

export default Component
