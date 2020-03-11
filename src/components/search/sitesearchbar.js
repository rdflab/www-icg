import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SiteSearchBar = ({
  handleInputChange,
  placeholder,
  text,
  className,
  border,
  selected,
}) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = e => {
    setHover(true)
  }

  const onMouseLeave = e => {
    setHover(false)
  }

  return (
    <div
      className={`row z-40 px-4 py-2 rounded-md items-center border border-solid  trans-ani ${
        hover || selected
          ? "bg-white border-gray-300"
          : "bg-gray-200 border-gray-200"
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        value={text}
        onChange={handleInputChange}
        className="w-full bg-transparent"
      />
      <FaSearch
        className={`${
          hover ? "text-blue-400" : "text-gray-500"
        } trans-ani ml-2`}
      />
    </div>
  )
}

SiteSearchBar.defaultProps = {
  placeholder: "Type to find items...",
  border: true,
  text: "",
  selected: false,
}

export default SiteSearchBar
