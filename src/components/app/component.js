
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

    // search command here
    setTimeout(() => this.setState({
      // disable loading
      loading: false,
      // add search meta
      meta: {
        timeElapsed: 50.20
      },
      // render result
      results: [
        {
          title: 'Ano ang Lorem Ipsum?',
          author: 'someone',
          body: 'Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum. body1 Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum. body1 Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum. body1 Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum. body1 Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo ang pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi lang limang siglo, kundi nalagpasan din nito ang paglaganap ng electronic typesetting at nanatiling parehas. Sumikat ito noong 1960s kasabay ng pag labas ng Letraset sheets na mayroong mga talata ng Lorem Ipsum, at kamakailan lang sa mga desktop publishing software tulad ng Aldus Pagemaker ginamit ang mga bersyon ng Lorem Ipsum. body1'
        },
        {
          title: 'Saan ito nanggaling?',
          author: 'someone',
          body: `Salungat sa kaalaman ng marami, ang Lorem Ipsum ay hindi puro walang kwentang salita lang. Umuugat ito sa klasikong literatura na Latin galing 45 BC, Pinpahiwatig na higit 2000 na ang taong gulang nito. Si Richard McClintock, isang Latin na propesor sa Hampden-Sydney College sa Viginia, ay hinanap ang isa sa mga tagong salita sa Latin, consectetur, galing sa talata ng Lorem Ipsum, at papunta sa mga siyudad sa mundo sa klasikal na literatura, natuklasan ang walang kadudadudang pinanggalingan. Ang Lorem Ipsum ay nangagaling sa mga seksyon 1.10.32 at 1.10.33 ng "de Finibus Bonorum et Malorum" (Ang Kasukdulan ng Mabuti at Masama) ni Cicero, isinulat noong 45 BC. Ang librong ito ay isang treatise sa teorya ng etika, tanyag noong Renaissance. Ang unang linya ng Lorem Ipsum, "Lorem ipsum dolor sit amet..", ay galing sa linya ng sekyon 1.10.32`
        },
        {
          title: 'Bakit natin ito ginagamit?',
          author: 'someone',
          body: `Matagal na nating alam na nakukuha ang atensyon ng nagbabasa ang nababasa na nilalaman ng pahina kapag tinitignan ang pagkakaayos. Ang punto ng paggamit ng Lorem Ipsum ay ito ay may humigit-kumulang na normal na distribusyion ng mga lettra, kesa sa paggamit ng 'Dito ang nilalaman, dito ang nilalaman', pinamumuka nitong nababasa. Maraming desktop publishing packages at web page editors ang gumagamit na ngayong ng Lorem Ipsum bilang regular na modelo ng nilalaman, at ang pag-search ng 'lorem ipsum' ay mag bubunyag ng maraming web sites na nasa kabataan pa lamang nila. Ang iba't-ibang mga bersyon nito ay nagbago paglipas ng mga taon, aksidente minsan, minsan sadya (nilagyan ng mga katatawanan at iba pa).`
        },
        {
          title: 'Saan ako makakakuha?',
          author: 'someone',
          body: `Maraming klase ng mga talata ng Lorem Ipsum and pwedeng magamit, pero ang karamihan ay nabago, dahil sa mga katatawanan, o ang mga ginulong mga salitang mahirap paniwalaan. Kung ikaw ay gagamit ng talata galing Lorem Ipsum, kailangan mong siguraduhin na walang nakakahiyang nakasulat sa gitna nito. Lahat ng mga gumagawa ng Lorem Ipsum sa Internet ay may ugali na ulitin and mga tipak hanggang sa kinakailangan, dahilan upang ito ang maging pinaka unang totoong tagagawa sa Internet, Gumagamit ito ng diksiyunaryo na may humigit 200 na salitang Latin, sinamahan ng isang dakot ng mga modelong pangungusap na straktura, upang makagawa ng Lorem Ipsum na mukang makatwiran. Kaya ang nagawang Lorem Ipsum ay palaging walang nauulit, nakakatawa, o mga walang-katangian na mga salita at iba pa.`
        }
      ]
    }), 2000)
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
        <span> by <span> { resultToView.author } </span> </span>
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
