

'use strict'

import 'normalize.css/normalize.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import render from './app-render'
import RootComponent from 'Components/app'

// For the material-ui onClick event
// Outside the render function for HMR
injectTapEventPlugin()

// Render the root compontn
render(RootComponent)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('Components/app', () => render(RootComponent))
}
