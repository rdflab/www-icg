import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SearchBar = ({
  handleInputChange,
  placeholder,
  text,
  className,
  border,
  selected,
}) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  return (
    <div
      className={`row z-40 px-4 py-2 border border-solid border-gray-300 rounded-md items-center bg-white trans-ani ${
        border ? "border-gray-300" : ""
      } ${hover || selected ? "shadow" : ""}
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
      <FontAwesomeIcon
        icon="search"
        className={`${
          hover ? "text-blue-400" : "text-gray-400"
        } trans-ani ml-2 text-lg`}
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
