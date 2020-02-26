/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import FilterItem from "./filteritem"

class FilterYears extends Component {
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

    for (let publication of this.props.publications) {
      if (publication.year !== -1) {
        years.add(publication.year)
      }
    }

    return (
      <>
        {Array.from(years)
          .sort()
          .reverse()
          .slice(0, this.props.top)
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

FilterYears.defaultProps = {
  top: 5,
}

export default FilterYears