/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import FilterItem from "./filteritem"

const TYPES = ["Faculty", "Scientist", "Staff"]

class TypesFilter extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedTypes: new Set() }
  }

  handleClick = data => {
    const selectedTypes = new Set(this.state.selectedTypes)

    if (data.selected) {
      selectedTypes.add(data.text)
    } else {
      selectedTypes.delete(data.text)
    }

    this.setState({ selectedTypes: selectedTypes }, console.log(this.state))

    console.log("piio", data.text, data.selected, selectedTypes)

    this.props.handleClick(selectedTypes)
  }

  render() {
    return (
      <>
        {TYPES.map((type, index) => {
            return (
              <FilterItem
                key={index}
                handleClick={this.handleClick}
                text={type}
              />
            )
          })}
      </>
    )
  }
}

export default TypesFilter
