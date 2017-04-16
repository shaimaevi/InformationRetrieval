
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

export default function render (Component) {
  // Start rendering root component
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}
