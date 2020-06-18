import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SiteSearchBar = ({
  handleInputChange,
  handleKeyDown,
  placeholder,
  text,
  className,
  selected,
}) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  const onFocus = (e) => {
    setHover(true)
  }

  const onBlur = (e) => {
    setHover(false)
  }

  //"bg-white border-gray-300"
  // "bg-gray-200 border-gray-200"

  return (
    <div
      className={`row z-40 px-4 py-2 rounded-md items-center justify-between trans-ani ${
        hover || selected ? "bg-white" : ""
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
          className={`bg-transparent w-full border-none outline-none ${
            hover || selected ? "text" : "text-transparent"
          }`}
        />
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon
          icon="search"
          className={`${
            hover || selected ? "text-blue-500" : "text-white-60"
          } trans-ani ml-2 text-lg`}
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
