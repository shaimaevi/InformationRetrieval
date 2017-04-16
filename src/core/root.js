
'use strict'

import React from 'react'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import AppComponent from 'Components/app'

// create and expose history
export const history = createHistory()

const RootComponent = () => {
  return (
    <Router history={history}>
      <AppComponent />
    </Router>
  )
}

export default RootComponent
