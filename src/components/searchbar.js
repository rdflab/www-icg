import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({ handleInputChange, placeholder }) => (
  <div className="search-bar">
    <input
      type="text"
      aria-label="Search"
      placeholder={placeholder}
      onChange={handleInputChange}
      className="search-input"
    />
    <FaSearch className="text-blue-500" />
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find publication...",
}

export default SearchBar
