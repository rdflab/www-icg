/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import SelectItem from "../filter/selectitem"

const AllType = ({ text, onClick, selected, children, className }) => (
  <SelectItem
    className={`font-semibold text-sm px-5 py-2 text-center hover:bg-gray-200 trans-ani ${className}`}
    selectedClassName="bg-gray-300"
    onClick={onClick}
    text={text}
    selected={selected}
  >
    {children}
  </SelectItem>
)

const SelectType = ({ text, onClick, selected, children }) => (
  <AllType
    className="border-l border-solid border-gray-400"
    onClick={onClick}
    text={text}
    selected={selected}
  >
    {children}
  </AllType>
)

const TypeSelector = ({ onClick }) => {
  const [selectedTypes, setSelectedTypes] = useState(["All"])

  const _handleClick = data => {
    const types = [data.text]
    setSelectedTypes(types)

    onClick(types)
  }

  return (
    <div className="row items-center rounded-md border border-solid border-gray-400 cursor-pointer overflow-hidden">
      <AllType
        onClick={_handleClick}
        text="All"
        selected={selectedTypes[0] === "All"}
      >
        All
      </AllType>
      <SelectType
        onClick={_handleClick}
        text="Faculty"
        selected={selectedTypes[0] === "Faculty"}
      >
        Faculty
      </SelectType>

      <SelectType
        onClick={_handleClick}
        text="Administration"
        selected={selectedTypes[0] === "Administration"}
      >
        Administration
      </SelectType>

      <SelectType
        onClick={_handleClick}
        text="Research Staff"
        selected={selectedTypes[0] === "Research Staff"}
      >
        Research Scientists
      </SelectType>

      <SelectType
        onClick={_handleClick}
        text="Staff"
        selected={selectedTypes[0] === "Staff"}
      >
        Staff
      </SelectType>
    </div>
  )
}

export default TypeSelector
