import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  handleInputChange,
  placeholder,
  text,
  className,
  borderColor,
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
      className={`row z-40 px-4 py-2 trans-ani border border-solid ${
        hover ? "border-blue-500" : borderColor
      } rounded-full items-center bg-white ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        value={text}
        onChange={handleInputChange}
        className="border-none w-full"
      />
      <FaSearch
        className={`${
          hover ? "text-blue-500" : "text-gray-500"
        } trans-ani ml-2`}
      />
    </div>
  )
}

SearchBar.defaultProps = {
  placeholder: "Type to find items...",
  borderColor: "border-gray-400",
  className: "",
  text: "",
}

export default SearchBar
