import React from "react"
import searchbarStyles from "./searchbar.module.scss"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({ handleInputChange, placeholder }) => (
  <div className={searchbarStyles.searchBar}>
    <input
      type="text"
      aria-label="Search"
      placeholder={placeholder}
      onChange={handleInputChange}
      className={searchbarStyles.searchInput}
    />
    <button className={searchbarStyles.searchButton} type="submit">
      <FaSearch />
    </button>
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find publication...",
}

export default SearchBar
