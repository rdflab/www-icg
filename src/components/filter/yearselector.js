/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import SelectItem from "./selectitem"

const AllType = ({ text, onClick, selected, children, className }) => (
  <SelectItem
    className={`font-semibold text-sm px-4 py-2 text-center trans-ani ${className}`}
    selectedClassName="bg-gray-200"
    onClick={onClick}
    text={text}
    selected={selected}
  >
    {children}
  </SelectItem>
)

const SelectType = ({ text, onClick, selected, children }) => (
  <AllType
    className="border-l-2 border-solid border-gray-300"
    onClick={onClick}
    text={text}
    selected={selected}
  >
    {children}
  </AllType>
)

const YearSelector = ({ maxYears, onClick }) => {
  const [selectedTypes, setSelectedTypes] = useState(["All"])

  const _handleClick = data => {
    const types = [data.text]
    setSelectedTypes(types)

    onClick(types)
  }

  const year = new Date().getFullYear()

  const years = []

  for (let i = 0; i < maxYears; ++i) {
    years.push(year - i)
  }

  return (
    <div className="row justify-center my-4">
      <div className="row items-center rounded-md border-2 border-solid border-gray-300 cursor-pointer overflow-hidden">
        <AllType
          onClick={_handleClick}
          text="All"
          selected={selectedTypes[0] === "All"}
        >
          All
        </AllType>

        {years.map((year, index) => (
          <SelectType
            key={index}
            onClick={_handleClick}
            text={year}
            selected={selectedTypes[0] === year}
          >
            {year}
          </SelectType>
        ))}
      </div>
    </div>
  )
}

YearSelector.defaultProps = {
  maxYears: 5,
}

export default YearSelector
