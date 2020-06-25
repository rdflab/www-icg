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
      className={`row z-40 px-6 py-3 bg-white border border-solid border-gray-300 hover:shadow rounded-full items-center trans-ani ${className}`}
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
