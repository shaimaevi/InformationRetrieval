
'use strict'

import React from 'react'
import styles from './style.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchBar from 'Components/searchbar'

const Component = props => {
  return (
    <MuiThemeProvider>
      <div className={styles.root}>
        <SearchBar />
      </div>
    </MuiThemeProvider>
  )
}

export default Component
