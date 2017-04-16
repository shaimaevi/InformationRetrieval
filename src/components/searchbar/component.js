
'use strict'

import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
import Paper from 'material-ui/Paper'
import AutoComplete from 'material-ui/AutoComplete'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'

class ModuleComponent extends Component {
  state = {
    searchString: ''
  }

  static propTypes = {
    onSearch: PropTypes.func,
    dataSource: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
    showEasterEgg: PropTypes.bool
  }

  static defaultProps = {
    onSearch: () => {},
    dataSource: []
  }

  onInputUpdate = (searchString) => {
    this.setState({ searchString })
  }

  onSearch = () => {
    const { onSearch } = this.props
    const { searchString } = this.state

    // give the searchString
    onSearch(searchString)
  }

  componentDidUpdate () {
    const { showEasterEgg } = this.props
    const { searchString } = this.state
    if (showEasterEgg && /^anything$/i.test(searchString)) {
      setTimeout(() => window.alert('Nice one!'), 200)
    }
  }

  render () {
    const { dataSource, loading } = this.props
    const { searchString } = this.state
    return (
      <Paper className={styles.root} zDepth={1}>
        <AutoComplete
          hintText='Type anything'
          searchText={searchString}
          dataSource={dataSource}
          onUpdateInput={this.onInputUpdate}
          onNewRequest={this.onSearch}
          fullWidth
          underlineShow={false}
        />
        {
          loading
            ? <CircularProgress size={20} style={{ marginLeft: 10 }} />
            : <IconButton onTouchTap={this.onSearch}> <ActionSearch /> </IconButton>
        }
      </Paper>
    )
  }
}

export default ModuleComponent
