import React from "react"
import { MdSearch } from 'react-icons/md';
import searchbarStyles from './searchbar.module.scss'

const SearchBar = props => (
    <div className={searchbarStyles.searchBar}>
        <input type="text" aria-label="Search" placeholder="Type to find publication..." onChange={props.handleInputChange} className={searchbarStyles.searchInput} />
        <button className={searchbarStyles.searchButton} type="submit"><MdSearch/></button>
    </div>
);

export default SearchBar