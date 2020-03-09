import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  handleInputChange,
  placeholder,
  text,
  className,
  color,
  borderColor,
}) => (
  <div
    className={`row z-40 p-2 trans-ani border border-solid ${borderColor} rounded items-center bg-white hover:border-blue-500 ${className}`}
  >
    <input
      type="text"
      aria-label="Search"
      placeholder={placeholder}
      value={text}
      onChange={handleInputChange}
      className="border-none w-full"
    />
    <FaSearch className={`trans-ani ${color}`} />
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find items...",
  borderColor: "border-gray-400",
  color: "text-blue-500",
  className: "",
  text: "",
}

export default SearchBar
