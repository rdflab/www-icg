import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({ handleInputChange, placeholder, text, className }) => (
  <div className={`search-bar ${className}`}>
    <input
      type="text"
      aria-label="Search"
      placeholder={placeholder}
      value={text}
      onChange={handleInputChange}
      className={`search-input`}
    />
    <FaSearch className="text-blue-500" />
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find publication...",
  className: "",
  text: "",
}

export default SearchBar
