/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import FilterItem from "../../components/filter/filteritem"

const CalEventSelector = ({ onClick, className }) => {
  const [selectedTypes, setSelectedTypes] = useState([])

  const _handleClick = (data) => {
    let types

    if (data.selected) {
      types = selectedTypes.concat([data.text])
    } else {
      types = selectedTypes.filter(t => {return t !== data.text})
    }

    setSelectedTypes(types)

    onClick(types)
  }

  return (
    <div className={className}>
      <FilterItem
          key={0}
          onClick={_handleClick}
          text="Seminar"
          selected={selectedTypes.includes("Seminar")}
        >
          "Seminar"
        </FilterItem>
        <FilterItem
          key={1}
          onClick={_handleClick}
          text="Public Talk"
          selected={selectedTypes.includes("Public Talk")}
        >
          "Public Talk"
        </FilterItem>
    </div>
  )
}

CalEventSelector.defaultProps = {
  className: ""
}

export default CalEventSelector
