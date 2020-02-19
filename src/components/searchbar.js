import React from "react"
import { MdSearch } from 'react-icons/md';
import searchbarStyles from './searchbar.module.scss'

const SearchBar = ({handleInputChange, placeholder}) => (
  <div className={searchbarStyles.searchBar}>
    <input type="text" aria-label="Search" placeholder={placeholder} onChange={handleInputChange} className={searchbarStyles.searchInput} />
    <button className={searchbarStyles.searchButton} type="submit"><MdSearch/></button>
  </div>
);

SearchBar.defaultProps = {
  placeholder: "Type to find publication..."
}

export default SearchBar