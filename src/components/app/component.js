
'use strict'

import _ from 'lodash'
import React, { Component } from 'react'
import styles from './style.scss'
import cn from 'classnames'
import logo from './assets/logo.png'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchBar from 'Components/searchbar'

const log = require('debug')('components/app/component')

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
      <div className={cn({
          [styles.searchbar]: true,
          [styles[`searchbar-${searching ? 'searching': 'home'}`]]: true
        })}>
        <div className={styles['searchbar-logo']}>
          <img
            height={!searching ? 150 : 30}
            src={logo}
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

  getResults = () => {
    const { results, loading } = this.state

    if (_.isEmpty(results) || loading) return

    return (
      <div className={styles.results}>
        Results here
      </div>
    )
  }

  getLoadingAnimation = () => {
    const { loading } = this.state

    if (!loading) return

    return (
      <div className={styles.loading}>
        Loading ...
      </div>
    )
  }

  render () {
    const { searching } = this.state
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
            this.getResults()
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
