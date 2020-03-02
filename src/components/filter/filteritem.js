/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { FaCheck } from "react-icons/fa"

const FilterItem = props => {
  const [selected, setSelected] = useState(false)

  const handleClick = e => {
    const data = { text: props.text, selected: !selected }

    setSelected(data.selected)

    props.handleClick(data)
  }

  return (
    <div className="row items-center cursor-pointer my-1" onClick={handleClick}>
      <div
        className={`border border-solid border-red-500 trans-ani text-white rounded p-1 mr-2 ${
          selected ? "bg-blue-400 border-blue-400" : "bg-white border-red-500"
        }`}
      >
        <FaCheck className={selected ? "visible" : "invisible"} />
      </div>

      <div>{props.text}</div>
    </div>
  )
}

export default FilterItem
