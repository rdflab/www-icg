/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import yearFilterStyles from "./yearfilter.module.scss"
import { MdCheck } from "react-icons/md"

const YearFilter = props => {
  const [selected, setSelected] = useState(false)

  const handleClick = e => {
    const data = { year: props.year, selected: !selected }

    setSelected(data.selected)

    props.handleClick(data)
  }

  return (
    <div
      onClick={handleClick}
      className={`${yearFilterStyles.yearFilter} ${
        selected ? yearFilterStyles.yearFilterSelected : ""
      }`}
    >
      {props.year}

      {selected ? (
        <div style={{ float: "right" }}>
          <MdCheck />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default YearFilter
