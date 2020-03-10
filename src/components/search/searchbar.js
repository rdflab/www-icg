import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  handleInputChange,
  placeholder,
  text,
  className,
  border,
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
      className={`row z-40 px-4 py-2 trans-ani ${border ? "shadow" : ""} ${
        hover ? "shadow" : ""
      }
      } rounded-md items-center bg-white ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        value={text}
        onChange={handleInputChange}
        className="w-full"
      />
      <FaSearch className={`text-blue-400 trans-ani ml-2`} />
    </div>
  )
}

SearchBar.defaultProps = {
  placeholder: "Type to find items...",
  border: true,
  text: "",
}

export default SearchBar
