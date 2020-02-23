import React from "react"
import searchbarStyles from "./searchbar.module.scss"
import { FaSearch } from "react-icons/fa"
import { IconContext } from "react-icons"

const SearchBar = ({ handleInputChange, placeholder }) => (
  <div className={searchbarStyles.searchBarContainer}>
    <div className={searchbarStyles.searchBar}>
      <input
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        onChange={handleInputChange}
        className={searchbarStyles.searchInput}
      />
      <button className={searchbarStyles.searchButton} type="submit">
        <IconContext.Provider value={{ color: "rgba(55, 113, 200, 0.8)" }}>
          <FaSearch />
        </IconContext.Provider>
      </button>
    </div>
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find publication...",
}

export default SearchBar
