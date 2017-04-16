
'use strict'

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
import Pagination from 'rc-pagination'
import Select from 'rc-select'
import en_US from 'rc-pagination/lib/locale/en_US'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'

const Result = props => {
  return (
    <div className={styles['res-root']}>
      <a onTouchTap={props.onTitleClicked}> <h1> { props.title } </h1> </a>
      <span> by <span> { props.author } </span> </span>
      <p>
        {
          _.truncate(props.body, {
            length: 350,
            separator: ' '
          })
        }
      </p>
    </div>
  )
}

const itemsToViewChoices = [10, 20, 50]

class ModuleComponent extends Component {
  state = {
    currentPage: 1,
    itemsToView: itemsToViewChoices[0]
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    onResultSelected: PropTypes.func,
    meta: PropTypes.object
  }

  static defaultProps = {
    data: [],
    onResultSelected: () => {}
  }

  get filteredData() {
    const { data } = this.props
    const { itemsToView, currentPage } = this.state

    const firstIndex = itemsToView * (currentPage - 1)
    const lastIndex = firstIndex + itemsToView

    return data.slice(firstIndex, lastIndex)
  }

  render () {
    const { data, onResultSelected, meta } = this.props
    const { currentPage, itemsToView } = this.state
    return (
      <div className={styles.root}>
        <span> { data.length } Results in { meta && meta.timeElapsed || 0 } ms </span>
        {
          this.filteredData.map((d, i) =>
            <Result
              key={i}
              {...d}
              onTitleClicked={() => onResultSelected(d)}
            />
          )
        }
        <div className={styles.paginator}>
          <Pagination
            total={data.length}
            showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
            onChange={ currentPage => this.setState({ currentPage }) }
            current={ currentPage }

            selectComponentClass={Select}
            showSizeChanger
            pageSize={itemsToView}
            onShowSizeChange={ (currentPage, itemsToView) => this.setState({ currentPage, itemsToView }) }

            pageSizeOptions={itemsToViewChoices.map(i => i.toString())}
            locale={en_US}
          />
        </div>
      </div>
    )
  }
}

export default ModuleComponent
