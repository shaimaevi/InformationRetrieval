
'use strict'

import _ from 'lodash'
import React, { Component } from 'react'
import styles from './style.scss'
import cn from 'classnames'
import logo from './assets/logo.png'
import searching1 from './assets/searching_1.gif'
import searching2 from './assets/searching_2.gif'
import searching3 from './assets/searching_3.gif'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchBar from 'Components/searchbar'
import Results from 'Components/results'
import CircularProgress from 'material-ui/CircularProgress'

const log = require('debug')('components/app/component')

const searching = [ searching1, searching2, searching3 ]

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
  state = {
    results: [],
    searching: false,
    loading: false
  }

  onSearch = (searchString) => {
    this.setState({
      // clear previous result
      results: [],
      searching: true,
      // Start loading
      loading: true
    })

    log('onSearch', searchString)

    // search command here
    setTimeout(() => this.setState({
      // disable loading
      loading: false,
      // render result
      results: [
        {
          title: 'some title1',
          body: 'some body1'
        },
        {
          title: 'some title2',
          body: 'some body2'
        },
        {
          title: 'some title3',
          body: 'some body3'
        },{
          title: 'some title4',
          body: 'some body4'
        }
      ]
    }), 2000);
  }

  getSearchbar = () => {
    const { searching } = this.state
    const { loading } = this.state
    return (
      <div
        className={cn({
          [styles.searchbar]: true,
          [styles[`searchbar-${searching ? 'searching': 'home'}`]]: true
        })}
      >
        <div className={styles['searchbar-logo']}>
          <img
            height={!searching ? 150 : 50}
            src={logo}
            alt='Logo'
          />
        </div>
        <div className={styles[`searchbar-padding-${searching ? 'searching': 'home'}`]}/>
        <div className={styles['searchbar-field']}>
          <SearchBar
            onSearch={this.onSearch}
            loading={loading}
            showEasterEgg={!searching}
          />
        </div>
      </div>
    )
  }

  getLoadingAnimation = () => {
    const { loading } = this.state

    if (!loading) return

    return (
      <div className={styles.loading}>
        <CircularProgress
          size={320} thickness={5}
        />
        <img
          src={searching[getRandomIntInclusive(0, 2)]}
          height={300}
          width={300}
          className={styles['loading-image']}
          alt='Searching...'
        />
      </div>
    )
  }

  render () {
    const { searching, results, loading } = this.state
    return (
      <MuiThemeProvider>
        <div
          className={cn({
            [styles.root]: true,
            [styles[`root-${searching ? 'searching': 'home'}`]]: true
          })}
        >
          {
            this.getSearchbar()
          }

          {
            searching && <hr className={styles.hr}/>
          }

          {
            this.getLoadingAnimation()
          }
          {
            (!_.isEmpty(results) && !loading) &&
            <Results data={results}/>
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
