
'use strict'

import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
import AutoComplete from 'material-ui/AutoComplete'

const log = require('debug')('components/searchbar/component')

class ModuleComponent extends Component {
  state = {
    searchString: ''
  }

  static propTypes = {
    onSearch: PropTypes.func,
    dataSource: PropTypes.arrayOf(PropTypes.any)
  }

  static defaultProps = {
    onSearch: () => {},
    dataSource: []
  }

  onInputUpdate = (searchString) => {
    this.setState({ searchString })
  }

  onSearch = () => {
    const { onSearch } = this.props;
    const { searchString } = this.state;

    log('onSearch', searchString)

    // give the searchString
    onSearch(searchString)
  }

  render () {
    const { dataSource } = this.props;
    const { searchString } = this.state;

    return (
      <div className={styles.root}>
        <AutoComplete
          hintText='Type anything'
          searchText={searchString}
          dataSource={dataSource}
          onUpdateInput={this.onInputUpdate}
          onNewRequest={this.onSearch}
          floatingLabelText='Full width'
          fullWidth
        />
      </div>
    )
  }
}

export default ModuleComponent
