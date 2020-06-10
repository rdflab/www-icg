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
import Img from "gatsby-image"
import ShowBetween from "../components/showbetween"
import useImageMap from "../hooks/imagemap"

const EMPTY_QUERY = ""

const Faculty = ({ person, imageMap }) => {
  const [hover, setHover] = useState(false)

  const { paths } = useSiteMetadata()

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  let img

  if (person.frontmatter.id in imageMap) {
    img = (
      <Img
        fluid={imageMap[person.frontmatter.id].childImageSharp.fluid}
        className="w-full h-full"
      />
    )
  } else {
    img = (
      <img src={genericsvg} className="w-full" alt={person.frontmatter.name} />
    )
  }

  return (
    <div
      className={`w-full mb-16 trans-ani`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`${paths.facultyPath}/${person.frontmatter.id}`}>
        <div
          className={`bg-white trans-ani rounded-lg overflow-hidden ${
            hover ? "shadow-lg" : ""
          }`}
        >
          {img}
        </div>
        <div className="m-1 mt-4">
          <h4 className="text-gray-800">
            {person.frontmatter.name}, {person.frontmatter.postNominalLetters}
          </h4>
          {/* <h5>{person.frontmatter.title}</h5> */}
        </div>
      </Link>
    </div>
  )
}

const StaffGrid = ({
  people,
  peopleMap,
  imageMap,
  cols,
  colWidth,
  headingColor,
}) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = null

      if (pc < people.length) {
        person = peopleMap[people[pc].person]
      }

      col.push(
        <Column className={`md:${colWidth}`} key={`person-${pc}`}>
          {person !== null && <Faculty person={person} imageMap={imageMap} />}
        </Column>
      )

      ++pc
    }

    ret.push(
      <Column className="justify-between" key={r}>
        {col}
      </Column>
    )

    if (pc === people.length) {
      break
    }
  }

  return ret
}

StaffGrid.defaultProps = {
  cols: 4,
  colWidth: "w-11/50",
}

const StaffGroups = ({
  allGroups,
  peopleMap,
  imageMap,
  cols,
  colWidth,
  headingColor,
}) => {
  const ret = []

  for (let group of allGroups) {
    ret.push(
      <h3 className={`${headingColor} my-4`} key={`header-${group.name}`}>
        {group.name}
      </h3>
    )

    ret.push(
      <StaffGrid
        people={group.people}
        peopleMap={peopleMap}
        imageMap={imageMap}
        key={group.name}
        cols={cols}
        colWidth={colWidth}
      />
    )
  }

  return ret
}

StaffGroups.defaultProps = {
  cols: 4,
  colWidth: "w-11/50",
  headingColor: "text-columbia-secondary-blue",
}

const AllFacultyTemplate = ({ path, pageContext, data }) => {
  const { allFaculty, peopleMap, crumbs } = pageContext

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
      title="Meet Our Faculty"
      headerComponent={<SiteSearch />}
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

      <div className="py-8">
        <Container>
          {/* <Labs labs={allGroups} /> */}
          {/*<StaffGrid labs={allGroups} /> */}

          <ShowSmall size="md">
            <StaffGroups
              allGroups={allFaculty}
              peopleMap={peopleMap}
              imageMap={imageMap}
              cols={2}
              colWidth="w-9/20"
            />
          </ShowSmall>

          <ShowBetween s1="md" s2="lg">
            <StaffGroups
              allGroups={allFaculty}
              peopleMap={peopleMap}
              imageMap={imageMap}
              cols={3}
              colWidth="w-3/10"
            />
          </ShowBetween>

          <ShowBetween s1="lg" s2="xl">
            <StaffGroups
              allGroups={allFaculty}
              peopleMap={peopleMap}
              imageMap={imageMap}
              cols={4}
              colWidth="w-11/50"
            />
          </ShowBetween>

          <HideSmall size="xl">
            <StaffGroups
              allGroups={allFaculty}
              peopleMap={peopleMap}
              imageMap={imageMap}
              cols={5}
              colWidth="w-9/50"
            />
          </HideSmall>
        </Container>
      </div>
    </CrumbTitleLayout>
  )
}

export default AllFacultyTemplate

export const query = graphql`
  query {
    files: allFile(filter: { absolutePath: { regex: "/images/people/" } }) {
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
