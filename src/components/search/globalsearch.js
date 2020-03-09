import React, { useState } from "react"
import SearchBar from "./searchbar"
import Columns from "../columns"
import Column from "../column"
import BlueLink from "../bluelink"

const GlobalSearchResult = ({ s1, s2, s3, link }) => (
  <Columns className="my-2">
    <Column w="1/2">
      <span>{s1}</span>
      <span className="bg-blue-100 text-blue-400">{s2}</span>
      <span>{s3}</span>
    </Column>
    <Column w="1/2">
      <BlueLink to={link.to}>{link.name}</BlueLink>
    </Column>
  </Columns>
)

const Heading = ({ name }) => (
  <div className="py-1 mt-2 mb-2 border-b border-solid border-gray-400 text-gray-500 text-sm font-semibold">
    {name}
  </div>
)

/**
 * If user clicks outside search, causes it to close
 * @param {*} showMenu    whether to show the menu or not
 * @param {*} handleClickEvent    allows menu to be closed
 */
const GlobalSearchMenuPane = ({ showMenu, handleClickEvent }) => {
  return (
    <div
      onClick={handleClickEvent}
      className={`fixed z-30 bg-transparent left-0 top-0 w-screen h-screen
        ${showMenu ? "block" : "hidden"}
      }`}
    />
  )
}

const GlobalSearchMenu = ({ showMenu, children }) => {
  return (
    <div
      className={`absolute z-50 bg-white p-4 shadow-md rounded-md w-full border border-solid border-gray-200 ${
        showMenu ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  )
}

const GlobalSearch = ({ searchData, className, placeholder, maxResults }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [hover, setHover] = useState(false)

  // const searchData = {}
  // searchData['sections'] = ['People']
  // searchData['data'] = {}
  // searchData['data']['People'] = {}
  // searchData['data']['People']['Cheese'] = {name:'Home', to:'/research/areas/cake'}

  const handleInputChange = e => {
    const q = e.target.value
    const ql = q.toLowerCase()

    let ret = []

    let c = 0
    let stop = false

    for (let section of searchData["sections"]) {
      let needsHeader = true

      for (let name of Object.keys(searchData["data"][section]).sort()) {
        const nl = name.toLowerCase()

        const p = nl.indexOf(ql)

        if (p !== -1) {
          if (needsHeader) {
            ret.push(<Heading name={section} />)
            needsHeader = false
          }
          const s1 = name.substring(0, p)
          const s2 = name.substring(p, p + ql.length)
          const s3 = name.substring(p + ql.length)

          ret.push(
            <GlobalSearchResult
              s1={s1}
              s2={s2}
              s3={s3}
              link={searchData["data"][section][name]}
            />
          )

          ++c

          if (c === maxResults) {
            stop = true
            break
          }
        }
      }
      if (stop) {
        break
      }
    }

    setResults(ret)

    setQuery(q)

    if (q !== "") {
      if (!showMenu) {
        setShowMenu(true)
      }
    } else {
      if (showMenu) {
        setShowMenu(false)
      }
    }
  }

  const handleClickEvent = e => {
    if (showMenu) {
      setShowMenu(false)
    }
  }

  const handleOnBlur = e => {
    if (showMenu) {
      setShowMenu(false)
    }
  }

  const handleMouseEnter = e => {
    setHover(true)
  }

  const handleMouseExit = e => {
    setHover(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <SearchBar
        handleInputChange={handleInputChange}
        text={query}
        placeholder={placeholder}
        color={showMenu || hover ? "text-blue-500" : "text-gray-400"}
        borderColor={showMenu ? "border-blue-500" : "border-transparent"}
      />
      <GlobalSearchMenuPane
        showMenu={showMenu}
        handleClickEvent={handleClickEvent}
      />
      <GlobalSearchMenu showMenu={showMenu}>{results}</GlobalSearchMenu>
    </div>
  )
}

GlobalSearch.defaultProps = {
  placeholder: "",
  className: "",
  maxResults: 10,
}

export default GlobalSearch
