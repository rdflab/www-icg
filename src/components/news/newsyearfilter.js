/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import FilterItem from "../filter/filteritem"

class NewsYearFilter extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedYears: new Set() }
  }

  handleClick = data => {
    const selectedYears = new Set(this.state.selectedYears)

    if (data.selected) {
      selectedYears.add(data.text)
    } else {
      selectedYears.delete(data.text)
    }

    this.setState({ selectedYears: selectedYears })

    this.props.handleClick(selectedYears)
  }

  render() {
    let years = new Set()

    for (let item of this.props.news) {
      years.add(item.frontmatter.year)
    }

    return (
      <>
        {Array.from(years)
          .sort()
          .reverse()
          .map((year, index) => {
            return (
              <FilterItem
                key={index}
                handleClick={this.handleClick}
                text={year}
              />
            )
          })}
      </>
    )
  }
}

export default NewsYearFilter
