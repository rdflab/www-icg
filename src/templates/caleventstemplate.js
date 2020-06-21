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

const EMPTY_QUERY = ""

// nav="Events"

const CalEventsTemplate = ({ path, pageContext, data }) => {
  const { allCalEvents } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredCalEvents, setFilteredCalEvents] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
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
      const title = event.frontmatter.title.toLowerCase()

      if (title.includes(q) || day === q || month === q) {
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

  return (
    <CrumbTitleLayout
      path={path}
      title="Institute Events"
      crumbs={[["Events", "/events"]]}
      headerComponent={<SiteSearch />}
      menuComponent={<ShareLinks path={path} />}
      headerFloat={true}
      // titleComponent={
      //   <SearchSummary
      //     count={calEvents.length}
      //     single="Event"
      //     plural="Events"
      //   />
      // }
    >
      <div className="bg-columbia-light-gray pt-48 md:pt-64 lg:pt-80">
        <Container>
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
            <MainColumn className="md:mr-8">
              <div className="w-full">
                <ShowSmall size="lg">
                  <SearchBar
                    handleInputChange={handleInputChange}
                    placeholder="Type to find events..."
                    text={query}
                  />
                </ShowSmall>

                <HideSmall size="lg">
                  <Column isCentered={true} className="mb-8">
                    <div className="w-2/3">
                      <SearchBar
                        handleInputChange={handleInputChange}
                        placeholder="Type to find events..."
                        text={query}
                      />
                    </div>
                  </Column>
                </HideSmall>

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

                <CalSearchResults
                  events={calEvents}
                  imageMap={imageMap}
                  pagedEvents={pagedEvents}
                  page={page}
                  recordsPerPage={recordsPerPage}
                  onPageChanged={onPageChanged}
                />
              </div>
            </MainColumn>
            <SideColumn>
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
              />
            </SideColumn>
          </Column>
        </Container>
      </div>
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
