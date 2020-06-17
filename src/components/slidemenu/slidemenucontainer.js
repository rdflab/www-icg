import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import SlideMenuLink from "./slidemenulink"
import SlideMenuCloseButton from "./slidemenuclosebutton"
import SiteSearchBar from "../search/sitesearchbar"
import { getSiteData, Heading } from "../search/sitesearch"
import { searchTree } from "../search/searchtree"
import SearchHighlight from "../search/searchhighlight"
import Column from "../column"
import logo from "../../assets/svg/icg-logo.svg"

const SiteSearchResult = ({ text, to }) => {
  return (
    <Link to={to}>
      <Column className="px-4 py-2 cursor-pointer hover:bg-gray-200 trans-ani">
        <div>{text}</div>
      </Column>
    </Link>
  )
}

const SlideMenuContainer = ({ title, onClick, visible, maxResults }) => {
  const data = useStaticQuery(graphql`
    query {
      links: allSlidemenulinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  //const [showMenu, setShowMenu] = useState(false)
  //const [hover, setHover] = useState(false)
  const [siteData, setSiteData] = useState(null)

  const search = (q, sd) => {
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

        let sectionComp = null

        if (section !== currentSection) {
          sectionComp = <Heading key={`heading-${c}`} name={section} />
          currentSection = section
        }

        // If we found a match render components
        if (sectionComp !== null) {
          ret.push(sectionComp)
        }

        ret.push(
          <SiteSearchResult
            key={`result-${c}`}
            text={<SearchHighlight text={name} words={words} />}
            to={link[3]}
          />
        )

        ++c

        // limit displayed results for performance
        if (c === maxResults) {
          break
        }
      }

      setResults(ret)
    }
  }

  const handleInputChange = (e) => {
    const q = e.target.value
    //const ql = q.toLowerCase()

    setQuery(q)

    if (q !== "") {
      if (siteData !== null) {
        search(q, siteData)
      } else {
        getSiteData().then((data) => {
          setSiteData(data)
          search(q, data)
        })
      }
    }
  }

  const links = flattenEdges(data.links.edges)

  // onClick={onClickHandle}

  let display

  if (results.length > 0) {
    display = results
  } else {
    display = links.map((link, index) => {
      return (
        <div key={index}>
          <SlideMenuLink
            key={index}
            to={link.link}
            active={link.name === title}
          >
            {link.name}
          </SlideMenuLink>
        </div>
      )
    })
  }

  return (
    <div
      className={`slide-menu-container ${
        visible ? "slide-menu-container-visible" : ""
      }`}
    >
      <div
        className={`fixed col shadow-xl rounded-lg bg-white overflow-hidden`}
        style={{
          margin: 0,
          padding: 0,
          top: "50vh",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "92%",
          height: "80vh",
        }}
      >
        <div className="row items-center justify-between p-4 mb-4 w-full border-b border-solid border-gray-300">
          <div>
            <img src={logo} className="h-8" alt="ICG logo" />
          </div>
          <div className="text-right">
            <SlideMenuCloseButton onClick={onClick} />
            {/* <button
              className="text-columbia-blue focus:outline-none"
              onClick={onClickHandle}
            >
              Done
            </button> */}
          </div>
        </div>
        <div className="mx-4 mb-4">
          <SiteSearchBar
            handleInputChange={handleInputChange}
            text={query}
            placeholder="Search site..."
          />
        </div>
        <div className="px-4">{display}</div>
      </div>
    </div>
  )
}

SlideMenuContainer.defaultProps = {
  maxResults: 5,
}

export default SlideMenuContainer
