/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import FilterItem from "../filter/filteritem"
import { MONTHS } from "../../constants"

class FilterNewsMonth extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedMonths: new Set() }
  }

  handleClick = (data) => {
    const selectedMonths = new Set(this.state.selectedMonths)

    if (data.selected) {
      selectedMonths.add(data.text)
    } else {
      selectedMonths.delete(data.text)
    }

    this.setState({ selectedYears: selectedMonths })

    this.props.handleClick(selectedMonths)
  }

  render() {
    let months = new Set()

    for (let item of this.props.news) {
      months.add(item.frontmatter.month)
    }

    let ret = []

    for (let i = 0; i < MONTHS.length; ++i) {
      const month = MONTHS[i]

      if (months.has(month)) {
        ret.push(
          <FilterItem key={i} handleClick={this.handleClick} text={month} />
        )
      }
    }

    return <>{ret}</>
  }
}

export default FilterNewsMonth
