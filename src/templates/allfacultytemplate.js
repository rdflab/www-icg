import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import { Link, graphql } from "gatsby"
import Container from "../components/container"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import useSiteMetadata from "../hooks/sitemetadata"
import ShowBetween from "../components/showbetween"
import useImageMap from "../hooks/imagemap"
import ShareLinks from "../components/share/sharelinks"
import getContextName from "../utils/contextname"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"
import Card from "../components/card"
import ZoomImage from "../components/images/zoomimage"

const EMPTY_QUERY = ""

const FacultyCard = ({ person, imageMap }) => {
  const [hover, setHover] = useState(false)

  const { paths } = useSiteMetadata()

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  return (
    <Card
      showCard={false}
      className="w-full h-full overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`${paths.facultyPath}/${person.frontmatter.id}`}>
        <div className={`w-full overflow-hidden rounded-lg trans-ani`}>
          <ZoomImage
            fluid={
              person.frontmatter.id in imageMap
                ? imageMap[person.frontmatter.id].childImageSharp.fluid
                : imageMap["generic"].childImageSharp.fluid
            }
            className="trans-ani"
            extZoom={hover}
          />
        </div>
        <div
          className={`w-full h-full pt-4 trans-ani  ${
            hover ? "text-blue-500" : ""
          }`}
        >
          {/* <h5>{`${person.frontmatter.name}, ${person.frontmatter.postNominalLetters}`}</h5> */}
          {/* <h4>{person.frontmatter.name}</h4> */}
          {/* <h5>{person.frontmatter.postNominalLetters}</h5> */}

          <ShowSmall>
            <h4>{`${person.frontmatter.name}, ${person.frontmatter.postNominalLetters}`}</h4>
            <h5>{getContextName("people", person.titleMap)}</h5>
          </ShowSmall>

          <HideSmall>
            <div className="font-semibold">{`${person.frontmatter.name}, ${person.frontmatter.postNominalLetters}`}</div>
            <div className="text-sm">
              {getContextName("people", person.titleMap)}
            </div>
          </HideSmall>
        </div>
      </Link>
    </Card>
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
        <Column className={`md:${colWidth} mb-8`} key={`person-${pc}`}>
          {person !== null && (
            <FacultyCard person={person} imageMap={imageMap} />
          )}
        </Column>
      )

      ++pc
    }

    ret.push(
      <Column className="justify-between items-start items-stretch" key={r}>
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
      <>
        <h3 className={`${headingColor} mb-2`} key={`header-${group.name}`}>
          {group.name}
        </h3>
        <Card className="bg-white p-4 md:p-6 mb-8 md:mb-12">
          <StaffGrid
            people={group.people}
            peopleMap={peopleMap}
            imageMap={imageMap}
            key={group.name}
            cols={cols}
            colWidth={colWidth}
          />
        </Card>
      </>
    )
  }

  return ret
}

StaffGroups.defaultProps = {
  cols: 4,
  colWidth: "w-11/50",
  headingColor: "text-gray-700",
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

  // nav="For Research Scientists"

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      title="Faculty"
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
      // titleContent={
      //   <SearchSummary count={groups.length} single="Lab" plural="Labs" />
      // }
    >
      {/* <SearchBar
        handleInputChange={handleInputChange}
        placeholder="Type to find labs"
        text={query}
        className="my-4"
      /> */}

      <FlHdDiv>
        <Container>
          {/* <Breadcrumb crumbs={crumbs} /> */}
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
              colWidth="w-19/100"
            />
          </HideSmall>
        </Container>
      </FlHdDiv>
    </CrumbTitleLayout>
  )
}

export default AllFacultyTemplate

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

    generic: file(absolutePath: { regex: "/generic.png/" }) {
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
`
