import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import { Link, graphql } from "gatsby"
import genericsvg from "../assets/svg/generic.svg"
import Container from "../components/container"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import useSiteMetadata from "../hooks/sitemetadata"
import useImageMap from "../hooks/imagemap"
import Img from "gatsby-image"
import ShowBetween from "../components/showbetween"
import ShareLinks from "../components/share/sharelinks"

const EMPTY_QUERY = ""

const LabCard = ({ lab, imageMap }) => {
  const [hover, setHover] = useState(false)

  const { paths } = useSiteMetadata()

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  let img

  if (lab.id in imageMap) {
    img = (
      <Img
        fluid={imageMap[lab.id].childImageSharp.fluid}
        className="w-full h-full"
      />
    )
  } else {
    img = <img src={genericsvg} className="w-full" alt={lab.name} />
  }

  return (
    <div
      className={`w-full mb-16 trans-ani`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`${paths.labsPath}/${lab.id}`}>
        <div
          className={`opacity-90 trans-ani rounded-lg overflow-hidden ${
            hover ? "opacity-100 shadow-md" : ""
          }`}
        >
          {img}
        </div>
        <div
          className={`m-1 mt-4 trans-ani ${
            hover ? "text-blue" : "text-gray-800"
          }`}
        >
          <h4>{lab.name}</h4>
        </div>
      </Link>
    </div>
  )
}

const LabGrid = ({ labs, cols, colWidth, imageMap }) => {
  const rows = Math.floor(labs.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let lab = labs[pc]

      col.push(
        <Column className={`md:${colWidth}`} key={pc}>
          {pc < labs.length && <LabCard lab={lab} imageMap={imageMap} />}
        </Column>
      )

      ++pc
    }

    ret.push(
      <Column className="justify-between" key={r}>
        {col}
      </Column>
    )

    if (pc === labs.length) {
      break
    }
  }

  return ret
}

LabGrid.defaultProps = {
  cols: 5,
  colWidth: "w-9/50",
}

const AllLabsTemplate = ({ path, pageContext, data }) => {
  const { allLabs, crumbs } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredGroups, setFilteredGroups] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const imageMap = useImageMap(data)

  // const handleInputChange = e => {
  //   const q = e.target.value.toLowerCase()
  //   let ret = []

  //   // for (let group of allGroups) {
  //   //   if (group.frontmatter.name.toLowerCase().includes(q)) {
  //   //     ret.push(group)
  //   //   }
  //   // }

  //   // update state according to the latest query and results
  //   setQuery(q)
  //   setFilteredGroups(ret)
  //   setPage(1)
  // }

  // const onPageChanged = data => {
  //   const { currentPage } = data
  //   setPage(currentPage)
  // }

  // const hasSearchResults = query !== EMPTY_QUERY
  // let groups = hasSearchResults ? filteredGroups : allGroups

  // const offset = (page - 1) * recordsPerPage
  // let pagedGroups = groups.slice(offset, offset + recordsPerPage)

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      nav="For Research Scientists"
      title="Research Labs"
      headerComponent={<SiteSearch />}
      menuComponent={<ShareLinks path={path} />}
      // titleComponent={
      //   <SearchSummary count={groups.length} single="Lab" plural="Labs" />
      // }
    >
      {/* <SearchBar
        handleInputChange={handleInputChange}
        placeholder="Type to find labs"
        text={query}
        className="my-4"
      /> */}

      <div className="my-16">
        <Container>
          <ShowSmall size="md">
            <LabGrid
              labs={allLabs}
              imageMap={imageMap}
              cols={2}
              colWidth="w-9/20"
            />
          </ShowSmall>

          <ShowBetween s1="md" s2="lg">
            <LabGrid
              labs={allLabs}
              imageMap={imageMap}
              cols={3}
              colWidth="w-3/10"
            />
          </ShowBetween>

          <ShowBetween s1="lg" s2="xl">
            <LabGrid
              labs={allLabs}
              imageMap={imageMap}
              cols={4}
              colWidth="w-11/50"
            />
          </ShowBetween>

          <HideSmall size="xl">
            <LabGrid labs={allLabs} imageMap={imageMap} />
          </HideSmall>
        </Container>
      </div>
    </CrumbTitleLayout>
  )
}

export default AllLabsTemplate

export const query = graphql`
  query {
    files: allFile(
      filter: {
        absolutePath: { regex: "/images/people/" }
        ext: { regex: "/jpg/" }
      }
    ) {
      edges {
        node {
          name
          ext
          relativePath
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
