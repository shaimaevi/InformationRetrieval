
'use strict'

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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import request from 'superagent-bluebird-promise'

const log = require('debug')('components/app/component')

const searching = [ searching1, searching2, searching3 ]

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class App extends Component {
  state = {
    results: [],
    meta: null,
    searching: false,
    loading: false,
    resultToView: null
  }

  onSearch = (searchString) => {
    this.setState({
      // clear previous result
      results: [],
      meta: null,
      resultToView: null,
      searching: true,
      // Start loading
      loading: true
    })

    log('onSearch', searchString)

    const onError = (err) => {
      // alert('Err', err)
      log('Err', err)
      this.setState({
        // disable loading
        loading: false
      })
    }

    request
      .get(`/api/engine`)
      .query({ searchString })
      .set('Accept', 'application/json')
      .then(res => {
        log(`response for searchstring '${searchString}'`, res)

        if (!res.body || res.body.error) {
          return onError(
            res.body
              ? new Error(res.body.error)
              : new Error('Error searching for', searchString)
          )
        }


        this.setState({
          // disable loading
          loading: false,
          // add search meta
          meta: {
            timeElapsed: 50.20
          },
          // render result
          results: res.body.result
        })
      })
      .catch(onError)
  }

  getSearchbar = () => {
    const { searching } = this.state
    const { loading } = this.state
    return (
      <div
        className={cn({
          [styles.searchbar]: true,
          [styles[`searchbar-${searching ? 'searching' : 'home'}`]]: true
        })}
      >
        <div className={styles['searchbar-logo']}>
          <img
            height={!searching ? 150 : 50}
            src={logo}
            alt='Logo'
          />
        </div>
        <div className={styles[`searchbar-padding-${searching ? 'searching' : 'home'}`]} />
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

  getResultViewer = () => {
    const { resultToView } = this.state

    if (!resultToView) return

    const handleClose = () => this.setState({ resultToView: null })

    return (
      <Dialog
        title={resultToView.title}
        actions={[
          <FlatButton
            label='Close'
            secondary
            onTouchTap={handleClose}
          />
        ]}
        open
        autoScrollBodyContent
        onRequestClose={handleClose}
      >
        <br/>
        <span> by <span> { resultToView.author } </span> </span>
        <br/>
        <span> for {resultToView.bookTitle} by {resultToView.bookAuthor} </span>
        <br/>
        <p>
          { resultToView.body }
        </p>
      </Dialog>
    )
  }

  render () {
    const { searching, results, meta, loading } = this.state
    return (
      <MuiThemeProvider>
        <div
          className={cn({
            [styles.root]: true,
            [styles[`root-${searching ? 'searching' : 'home'}`]]: true
          })}
        >
          {
            this.getResultViewer()
          }

          {
            this.getSearchbar()
          }

          {
            searching && <hr className={styles.hr} />
          }

          {
            this.getLoadingAnimation()
          }

          {
            (searching && !loading) &&
            <Results
              meta={meta}
              data={results}
              onResultSelected={resultToView => this.setState({ resultToView })}
            />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
