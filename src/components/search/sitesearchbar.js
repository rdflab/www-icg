import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SiteSearchBar = ({
  handleInputChange,
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

  //"bg-white border-gray-300"
  // "bg-gray-200 border-gray-200"

  return (
    <div
      className={`row z-40 text-gray-900 px-4 py-2 rounded-md items-center border border-solid justify-between trans-ani ${
        hover || selected ? "border-gray-300" : "border-white"
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
            hover ? "text-blue-400" : "text-gray-400"
          } trans-ani ml-2`}
        />
      </div>
    </div>
  )
}

SiteSearchBar.defaultProps = {
  placeholder: "Type to find items...",
  text: "",
  selected: false,
}

export default SiteSearchBar
