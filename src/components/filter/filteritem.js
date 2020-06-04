/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FilterItem = (props) => {
  const [selected, setSelected] = useState(false)

  const handleClick = (e) => {
    const data = { text: props.text, selected: !selected }

    setSelected(data.selected)

    props.handleClick(data)
  }

  return (
    <div className="row items-center cursor-pointer my-1" onClick={handleClick}>
      <div
        className={`row items-center w-6 h-6 border border-solid border-gray-400 trans-ani text-white rounded p-1 mr-2 ${
          selected ? "bg-blue-300 border-blue-300" : "bg-white"
        }`}
      >
        <FontAwesomeIcon
          icon="check"
          className={`mx-auto ${selected ? "visible" : "invisible"} text-3xl`}
        />
      </div>

      <div className="text-gray-700">{props.text}</div>
    </div>
  )
}

export default FilterItem
