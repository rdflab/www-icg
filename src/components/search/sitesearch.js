import React, { useState } from "react"
import SiteSearchBar from "./sitesearchbar"
import Columns from "../columns"
import Column from "../column"
import BlueLink from "../bluelink"
import HideSmall from "../hidesmall"
import BlueLinkExt from "../bluelinkext"

const axios = require("axios")

const SearchHighlight = ({text, search, p, l, className}) => {
  if (search !== "") {
    p = text.toLowerCase().indexOf(search)
    l = search.length
  }

  if (p !== -1) {
    const n = p + l
    const s1 = text.substring(0, p)
    const s2 = text.substring(p, n)
    const s3 = text.substring(n)

    return (
      <>
        <span>{s1}</span>
        <span className={className}>{s2}</span>
        <span>{s3}</span>
      </>
    )
  } else {
    return text
  }
}

SearchHighlight.defaultProps = {
  search: "",
  l: -1,
  p: -1,
  className:"bg-blue-100 text-blue-400",
}

const SiteSearchResult = ({ text, to, link }) => {
  let linkComp

  if (to.includes("http")) {
    linkComp = (
      <BlueLinkExt target="_blank" to={to}>
        {link}
      </BlueLinkExt>
    )
  } else {
    linkComp = <BlueLink to={to}>{link}</BlueLink>
  }

  return (
    <Columns className="my-2">
      <Column w="7/12" className="mr-4">
        {text}
      </Column>
      <Column w="5/12">{linkComp}</Column>
    </Columns>
  )
}

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
const SiteSearchMenuPane = ({ showMenu, handleClickEvent }) => {
  return (
    <div
      onClick={handleClickEvent}
      className={`fixed z-30 bg-transparent left-0 top-0 w-screen h-screen
        ${showMenu ? "block" : "hidden"}
      }`}
    />
  )
}

const SiteSearchMenu = ({ showMenu, children }) => {
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

const getSiteData = () => {
  return axios.get("/site.json").then(resp => {
    return resp.data
  })
}

const SiteSearch = ({ className, placeholder, maxResults }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [hover, setHover] = useState(false)
  const [siteData, setSiteData] = useState(null)

  // useEffect(() => {
  //   setSiteData(getSiteData(setSiteData))

  // }, [])

  const search = (q, sd) => {
    //console.log("q", q)

    let node
    let found
    const words = q.split(" ")

    const items = []

    for (let word of words) {
      node = sd.tree

      found = true

      for (let i = 0; i < word.length; ++i) {
        const c = word.charAt(i)

        if (c in node[0]) {
          node = node[0][c]
        } else {
          found = false
          break
        }
      }

      if (found) {
        for (let item of node[1]) {
          if (!items.includes(item)) {
            items.push(item)
          }
        }
      }
    }

    // If some links were found, put them in the search
    // results
    if (items.length > 0) {
      let c = 0
      let currentSection = ""
      let ret = []

      for (let item of items) {
        let link = sd.links[item]

        const name = link[0]
        const section = sd.sections[link[1]]

        const nl = link[0].toLowerCase()

        // first the first match in the string and highlight that

        // The index of a match cannot exceed 100, so anything
        // we find must be smaller
        let minP = 100

        let sectionComp = null
        let resultComp = null

        for (let word of words) {
          const p = nl.indexOf(word)

          if (p != -1 && p < minP) {
            if (section !== currentSection && sectionComp === null) {
              sectionComp = <Heading key={`heading-${c}`} name={section} />
              currentSection = section
            }

            resultComp = (
              
              <SiteSearchResult
                key={`result-${c}`}
                text={<SearchHighlight text={name} p={p} l={word.length} />}
                to={link[3]}
                link={sd.linkNames[link[2]]}
              />
            )

            minP = p
          }
        }

        // If we found a match render components

        if (sectionComp !== null) {
          ret.push(sectionComp)
        }

        if (resultComp !== null) {
          ret.push(resultComp)
        }

        ++c

        // limit displayed results for performance
        if (c === maxResults) {
          break
        }
      }

      if (ret.length > 0) {
        if (!showMenu) {
          setShowMenu(true)
        }

        setResults(ret)
      }
    }
  }

  const handleInputChange = e => {
    const q = e.target.value
    const ql = q.toLowerCase()

    setQuery(q)

    if (ql === "") {
      if (showMenu) {
        setShowMenu(false)
      }
    } else {
      if (siteData !== null) {
        search(ql, siteData)
      } else {
        getSiteData().then(data => {
          setSiteData(data)
          search(ql, data)
        })
      }
    }

    // for (let section of searchData["sections"]) {
    //   let needsHeader = true

    //   for (let name of Object.keys(searchData["data"][section]).sort()) {
    //     const nl = name.toLowerCase()

    //     const p = nl.indexOf(ql)

    //     if (p !== -1) {
    //       if (needsHeader) {
    //         ret.push(<Heading name={section} />)
    //         needsHeader = false
    //       }
    //       const s1 = name.substring(0, p)
    //       const s2 = name.substring(p, p + ql.length)
    //       const s3 = name.substring(p + ql.length)

    //       ret.push(
    //         <SiteSearchResult key={c}
    //           s1={s1}
    //           s2={s2}
    //           s3={s3}
    //           link={searchData["data"][section][name]}
    //         />
    //       )

    //       ++c

    //       if (c === maxResults) {
    //         stop = true
    //         break
    //       }
    //     }
    //   }
    //   if (stop) {
    //     break
    //   }
    // }

    // setResults(ret)
  }

  const handleClickEvent = e => {
    if (showMenu) {
      setShowMenu(false)
    }
  }

  return (
    <HideSmall className="relative w-1/2">
      <SiteSearchBar
        handleInputChange={handleInputChange}
        text={query}
        placeholder={placeholder}
        border={false}
        selected={showMenu}
        className="ml-auto w-1/2"
      />

      <SiteSearchMenuPane
        showMenu={showMenu}
        handleClickEvent={handleClickEvent}
      />
      <SiteSearchMenu showMenu={showMenu} className="w-1/2">
        {results}
      </SiteSearchMenu>
    </HideSmall>
  )
}

SiteSearch.defaultProps = {
  placeholder: "",
  className: "",
  maxResults: 10,
}

export default SiteSearch
