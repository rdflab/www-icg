import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
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
      className={`row z-40 px-4 py-2 border border-solid border-gray-300 rounded-md items-center bg-white trans-ani ${
        border ? "border-gray-300" : ""
      } ${hover || selected ? "border-gray-400" : ""}
       ${className}`}
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
          hover ? "text-blue-400" : "text-gray-400"
        } trans-ani ml-2`}
      />
    </div>
  )
}

SearchBar.defaultProps = {
  placeholder: "Type to find items...",
  border: true,
  text: "",
  selected: false,
}

export default SearchBar
