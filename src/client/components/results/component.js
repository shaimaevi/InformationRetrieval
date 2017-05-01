
'use strict'

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import styles from './style.scss'
import Pagination from 'rc-pagination'
import Select from 'rc-select'
import enUS from 'rc-pagination/lib/locale/en_US'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'

const Result = props => {
  function isAKeyword (str) {
    return _.words(props.searchString).find(r => new RegExp(r, 'i').test(str))
  }
  return (
    <div className={styles['res-root']}>
      <a onTouchTap={props.onTitleClicked}>
        <h1>
          <div
            dangerouslySetInnerHTML={{
              __html: _.split(_.truncate(props.title, { length: 350, separator: ' ' }), ' ')
                .map(
                  r => isAKeyword(r)
                    ? `<span style="color:red;text-decoration:solid;"> ${r} </span>`
                    : r
                )
                .join(' ')
            }}
          />
        </h1>
      </a>
      <span> by <span> { props.author } </span> </span>
      <br/>
      <span> for {props.bookTitle} by {props.bookAuthor} </span>
      <br/>
      <span> relevance: { props.score } </span>
      <div
          dangerouslySetInnerHTML={{
            __html: _.split(_.truncate(props.body, { length: 350, separator: ' ' }), ' ')
              .map(
                r => isAKeyword(r)
                  ? `<span style="color:red;text-decoration:solid;"> ${r} </span>`
                  : r
              )
              .join(' ')
          }}
        />
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

  get filteredData () {
    const { data } = this.props
    const { itemsToView, currentPage } = this.state

    const firstIndex = itemsToView * (currentPage - 1)
    const lastIndex = firstIndex + itemsToView

    return data.slice(firstIndex, lastIndex)
  }

  render () {
    const { data, onResultSelected, meta, searchString } = this.props
    const { currentPage, itemsToView } = this.state

    if (_.isEmpty(data)) {
      return (
        <div className={styles['no-result-root']}>
          <h1> No results </h1>
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <span> { data.length } Results in { meta ? meta.timeElapsed : 0 } ms </span>
        {
          this.filteredData.map((d, i) =>
            <Result
              key={i}
              {...d}
              searchString={searchString}
              onTitleClicked={() => onResultSelected(d)}
            />
          )
        }
        <div className={styles.paginator}>
          <Pagination
            total={data.length}
            showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
            onChange={currentPage => this.setState({ currentPage })}
            current={currentPage}

            selectComponentClass={Select}
            showSizeChanger
            pageSize={itemsToView}
            onShowSizeChange={(currentPage, itemsToView) => this.setState({ currentPage, itemsToView })}

            pageSizeOptions={itemsToViewChoices.map(i => i.toString())}
            locale={enUS}
          />
        </div>
      </div>
    )
  }
}

export default ModuleComponent
