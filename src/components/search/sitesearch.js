import React, { useState } from "react"
import SiteSearchBar from "./sitesearchbar"
import Column from "../column"
import BlueLink from "../bluelink"
import HideSmall from "../hidesmall"
import BlueLinkExt from "../bluelinkext"
import SearchHighlight from "./searchhighlight"
import { searchTree } from "./searchtree"
import { Link } from "gatsby"

const axios = require("axios")

export const SiteLink = ({ to, link }) => {
  let linkComp

  if (to.includes("http")) {
    return (
      <BlueLinkExt target="_blank" to={to}>
        {link}
      </BlueLinkExt>
    )
  } else {
    return <BlueLink to={to}>{link}</BlueLink>
  }
}

const SiteSearchResult = ({ text, to, link }) => {
  return (
    <Link to={to} className="p-0 m-0">
      <Column className="px-4 py-2 cursor-pointer hover:bg-gray-200 trans-ani">
        <Column w="7" className="mr-4">
          <div>{text}</div>
        </Column>
        <Column w="5">
          <div>{link}</div>
        </Column>
      </Column>
    </Link>
  )
}

export const Heading = ({ name }) => (
  <div className="px-4 pt-4 mb-2 text-gray-500 text-sm font-semibold">
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
      className={`absolute z-50 bg-white p-0 m-0 outline-none shadow-md rounded-md overflow-hidden border border-solid border-gray-200 w-full ${
        showMenu ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  )
}

export const getSiteData = () => {
  return axios.get("/site.index.json").then(resp => {
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

    const [items, words] = searchTree(sd.tree, q)

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

          if (p !== -1 && p < minP) {
            if (section !== currentSection && sectionComp === null) {
              sectionComp = <Heading key={`heading-${c}`} name={section} />
              currentSection = section
            }

            resultComp = (
              <SiteSearchResult
                key={`result-${c}`}
                text={<SearchHighlight text={name} words={words} />}
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

      if (!showMenu) {
        setShowMenu(true)
      }

      setResults(ret)
    } else {
      if (showMenu) {
        setShowMenu(false)
      }
    }
  }

  const handleInputChange = e => {
    const q = e.target.value
    //const ql = q.toLowerCase()

    setQuery(q)

    if (q === "") {
      if (showMenu) {
        setShowMenu(false)
      }
    } else {
      if (siteData !== null) {
        search(q, siteData)
      } else {
        getSiteData().then(data => {
          setSiteData(data)
          search(q, data)
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
    <HideSmall size="md" className="relative w-1/2">
      <SiteSearchBar
        handleInputChange={handleInputChange}
        text={query}
        placeholder={placeholder}
        border={false}
        selected={showMenu}
        className="ml-auto w-3/4"
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
