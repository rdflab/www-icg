import React, { useState } from "react"
import { graphql } from "gatsby"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SearchBar from "../components/search/searchbar"
import SiteSearch from "../components/search/sitesearch"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import Column from "../components/column"
import CalSearchResults from "../components/calendar/calsearchresults"
import DayPicker from "react-day-picker"
import "../../node_modules/react-day-picker/lib/style.css"
import "../components/calendar/calendar.scss"
import HideSmall from "../components/hidesmall"
import Container from "../components/container"
//import CalEventSelector from "../components/calendar/caleventselector"
import ShareLinks from "../components/share/sharelinks"
import useImageMap from "../hooks/imagemap"
import ShowSmall from "../components/showsmall"
import FlHdDiv from "../components/flhddiv"
import FullDiv from "../components/fulldiv"
//import Breadcrumb from "../components/breadcrumb2"

const EMPTY_QUERY = ""

// nav="Events"

const CalEventsTemplate = ({ path, pageContext, data }) => {
  const { allCalEvents } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredCalEvents, setFilteredCalEvents] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [selectedDays, setSelectedDays] = useState([])
  const [filterEventTypes, setFilterEventTypes] = useState(
    pageContext.filterEventTypes
  )

  const imageMap = useImageMap(data)

  // useEffect(() => {
  //   for (let calEvent of allCalEvents) {
  //     if (calEvent.start === undefined) {
  //       calEvent.start = new Date(calEvent.frontmatter.start)
  //       calEvent.end = new Date(calEvent.frontmatter.end)
  //     }
  //   }
  // }, [])

  const handleDayClick = (day, { selected }) => {
    // const { selectedDays } = this.state;
    // if (selected) {
    //   const selectedIndex = selectedDays.findIndex(selectedDay =>
    //     DateUtils.isSameDay(selectedDay, day)
    //   );
    //   selectedDays.splice(selectedIndex, 1);
    // } else {
    //   selectedDays.push(day);
    // }
    setQuery("")
    setSelectedDays(selected ? [] : [day])
    setPage(1)
  }

  const handleInputChange = (e) => {
    const q = e.target.value.toLowerCase()
    let ret = []

    for (let event of allCalEvents) {
      const day = event.frontmatter.start.toLocaleString("default", {
        day: "numeric",
      })
      const month = event.frontmatter.start
        .toLocaleString("default", { month: "short" })
        .toLowerCase()

      if (
        event.frontmatter.title.toLowerCase().includes(q) ||
        event.excerpt.toLowerCase().includes(q) ||
        day === q ||
        month === q
      ) {
        ret.push(event)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredCalEvents(ret)
    setPage(1)
  }

  const handleTypeClick = (eventTypes) => {
    setFilterEventTypes(eventTypes)
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    setPage(currentPage)
  }

  let calEvents

  if (query !== EMPTY_QUERY) {
    calEvents = filteredCalEvents
  } else {
    let dayFilteredEvents = []

    if (selectedDays.length > 0) {
      const day = parseInt(
        selectedDays[0].toLocaleString("default", { day: "numeric" })
      )
      const month = parseInt(
        selectedDays[0].toLocaleString("default", { month: "numeric" })
      )
      const year = parseInt(
        selectedDays[0].toLocaleString("default", { year: "numeric" })
      )

      calEvents = allCalEvents.filter((e) => {
        return (
          parseInt(e.frontmatter.day) === day &&
          parseInt(e.frontmatter.monthNum) === month &&
          parseInt(e.frontmatter.year) === year
        )
      })
    } else {
      const now = new Date()

      const day = parseInt(now.toLocaleString("default", { day: "numeric" }))
      const month = parseInt(
        now.toLocaleString("default", { month: "numeric" })
      )
      const year = parseInt(now.toLocaleString("default", { year: "numeric" }))

      calEvents = allCalEvents.filter((e) => {
        const t1 =
          parseInt(e.frontmatter.day) >= day &&
          parseInt(e.frontmatter.monthNum) === month &&
          parseInt(e.frontmatter.year) === year
        const t2 =
          parseInt(e.frontmatter.monthNum) > month &&
          parseInt(e.frontmatter.year) >= year
        return t1 || t2
      })
    }
  }

  // Filter by types
  if (filterEventTypes.length > 0) {
    calEvents = calEvents.filter((e) => {
      for (let t of filterEventTypes) {
        if (e.frontmatter.tags.includes(t)) {
          return true
        }
      }

      return false
    })
  }

  const offset = (page - 1) * recordsPerPage

  let pagedEvents = calEvents.slice(offset, offset + recordsPerPage)

  const crumbs = [["Events", "/events"]]

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      title="Events"
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
      bgColorClass="bg-white"
      // titleContent={
      //   <SearchSummary
      //     count={calEvents.length}
      //     single="Event"
      //     plural="Events"
      //   />
      // }
    >
      <ShowSmall size="lg" className="py-8">
        <Container>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find events..."
            text={query}
          />
        </Container>
      </ShowSmall>

      {/* <HideSmall size="lg" className="bg-columbia-light-gray py-8">
          <Container>
            <Column isCentered={true}>
              <div className="w-1/2">
                <SearchBar
                  handleInputChange={handleInputChange}
                  placeholder="Type to find events..."
                  text={query}
                />
              </div>
            </Column>
          </Container>
        </HideSmall> */}

      <Container>
        {/* <Breadcrumb crumbs={crumbs} /> */}
        <Column>
          {/* <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find events..."
        />
        <div className="text-center">
          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        </div>
      </SmallColumn> */}
          <MainColumn w="w-8/10">
            <FullDiv>
              {/* </div> */}

              {/* <Column className="justify-between">
              <div>
                <Title>Events</Title>
              </div>
              <div className="w-1/2">
                <SearchBar
                  handleInputChange={handleInputChange}
                  placeholder="Type to find events..."
                  text={query}
                />
              </div>
            </Column> */}

              <HideSmall size="lg" className="py-8">
                <Column isCentered={true}>
                  <div className="w-1/2">
                    <SearchBar
                      handleInputChange={handleInputChange}
                      placeholder="Type to find events..."
                      text={query}
                    />
                  </div>
                </Column>
              </HideSmall>

              <div className="mb-4">
                <CalSearchResults
                  events={calEvents}
                  imageMap={imageMap}
                  pagedEvents={pagedEvents}
                  page={page}
                  recordsPerPage={recordsPerPage}
                  onPageChanged={onPageChanged}
                />
              </div>
            </FullDiv>
          </MainColumn>
          <SideColumn w="w-2/10" className="pl-12">
            <div className="pt-8">
              <h4>Date Filter</h4>
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
              />
            </div>
          </SideColumn>
        </Column>
      </Container>
    </CrumbTitleLayout>
  )
}

export default CalEventsTemplate

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
