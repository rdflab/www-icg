import React from "react"
import searchbarStyles from "./searchbar.module.scss"
import { FaSearch } from "react-icons/fa"
import { IconContext } from "react-icons"
import styled from "styled-components"

const Icon = styled(FaSearch)`
  color: cornflowerblue;
`

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
        <Icon />
      </button>
    </div>
  </div>
)

SearchBar.defaultProps = {
  placeholder: "Type to find publication...",
}

export default SearchBar
