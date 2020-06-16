/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FilterItem = ({text, onClick}) => {
  const [selected, setSelected] = useState(false)

  const _handleClick = (e) => {
    const data = { text: text, selected: !selected }

    setSelected(data.selected)

    onClick(data)
  }

  return (
    <div className="row items-center cursor-pointer my-2" onClick={_handleClick}>
      <div
        className={`row items-center w-6 h-6 border border-solid border-gray-400 trans-ani text-white rounded p-1 mr-2 ${
          selected ? "bg-blue-300 border-blue-300" : "bg-white"
        }`}
      >
        <FontAwesomeIcon
          icon="check"
          className={`mx-auto ${selected ? "visible" : "invisible"}`}
        />
      </div>

      <div className="text-gray-700">{text}</div>
    </div>
  )
}


export default FilterItem
