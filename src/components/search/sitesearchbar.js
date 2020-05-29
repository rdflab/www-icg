import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SiteSearchBar = ({
  handleInputChange,
  handleKeyDown,
  placeholder,
  text,
  className,
  selected,
}) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = e => {
    setHover(true)
  }

  const onMouseLeave = e => {
    setHover(false)
  }

  const onFocus = e => {
    setHover(true)
  }

  const onBlur = e => {
    setHover(false)
  }

  //"bg-white border-gray-300"
  // "bg-gray-200 border-gray-200"

  return (
    <div
      className={`row z-40 px-4 py-2 rounded-md border-solid border border-white items-center justify-between trans-ani ${
        hover || selected ? "border-gray-300" : ""
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center w-full">
        <input
          type="text"
          aria-label="Search"
          placeholder={placeholder}
          value={text}
          onChange={handleInputChange}
          className="bg-transparent w-full border-none outline-none"
        />
      </div>
      <div className="flex items-center">
        <FaSearch
          className={`${
            hover || selected ? "text-blue-500" : "text-gray-400"
          } trans-ani ml-2`}
        />
      </div>
    </div>
  )
}

SiteSearchBar.defaultProps = {
  placeholder: "Type to search...",
  text: "",
  selected: false,
}

export default SiteSearchBar
