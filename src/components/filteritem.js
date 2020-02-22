/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import filterItemStyles from "./filteritem.module.scss"
import { FaCheck } from "react-icons/fa"

const FilterItem = props => {
  const [selected, setSelected] = useState(false)

  const handleClick = e => {
    const data = { text: props.text, selected: !selected }

    setSelected(data.selected)

    props.handleClick(data)
  }

  return (
    <div
      onClick={handleClick}
      className={`${filterItemStyles.filter} ${
        selected ? filterItemStyles.filterSelected : ""
      }`}
    >
      {props.text}

      {selected ? (
        <div style={{ float: "right" }}>
          <FaCheck />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default FilterItem
