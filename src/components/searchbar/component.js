
'use strict'

import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
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
    loading: PropTypes.bool
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

    // give the searchString
    onSearch(searchString)
  }

  render () {
    const { dataSource, loading } = this.props;
    const { searchString } = this.state;
    return (
      <div className={styles.root}>
        <AutoComplete
          hintText='Type anything'
          searchText={searchString}
          dataSource={dataSource}
          onUpdateInput={this.onInputUpdate}
          onNewRequest={this.onSearch}
          fullWidth
        />
        {
          loading
            ? <CircularProgress size={20} style={{ marginLeft: 10 }}/>
            : <IconButton> <ActionSearch/> </IconButton>
        }
      </div>
    )
  }
}

export default ModuleComponent
