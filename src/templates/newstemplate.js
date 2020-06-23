import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import NewsSearchResults from "../components/news/newssearchresults"
import Container from "../components/container"
import ShareLinks from "../components/share/sharelinks"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import DayPicker from "react-day-picker"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"

const EMPTY_QUERY = ""

// nav="News"

const NewsTemplate = ({ path, pageContext }) => {
  const { allNews } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredNews, setFilteredNews] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState([])
  const [selectedDays, setSelectedDays] = useState([])

  // useEffect(() => {
  //   for (let item of allNews) {
  //     if (item.date === undefined) {
  //       item.date = new Date(item.frontmatter.date)
  //     }
  //   }
  // }, [])

  // for (let item of allNews) {
  //   if (item.date === undefined) {
  //     item.date = new Date(item.frontmatter.date)
  //   }
  // }

  const handleInputChange = (e) => {
    const q = e.target.value
    let ret = []

    for (let newsitem of allNews) {
      if (newsitem.title.toLowerCase().includes(q.toLowerCase())) {
        ret.push(newsitem)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredNews(ret)
    setPage(1)
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = (data) => {
    setFilterYears(data)
    setPage(1)
  }

  const handleDayClick = (day, { selected }) => {
    setQuery("")
    setSelectedDays(selected ? [] : [day])
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let news = hasSearchResults ? filteredNews : allNews

  let yearFilteredNews

  if (filterYears.length > 0 && filterYears[0] !== "All") {
    yearFilteredNews = news.filter((item) => {
      return filterYears.includes(item.frontmatter.year)
    })
  } else {
    yearFilteredNews = news
  }

  let dayFilteredNews = []

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

    dayFilteredNews = yearFilteredNews.filter((e) => {
      return (
        parseInt(e.frontmatter.day) === day &&
        parseInt(e.frontmatter.monthNum) === month &&
        parseInt(e.frontmatter.year) === year
      )
    })
  } else {
    dayFilteredNews = yearFilteredNews

    // const now = new Date()

    // const day = parseInt(now.toLocaleString("default", { day: "numeric" }))
    // const month = parseInt(
    //   now.toLocaleString("default", { month: "numeric" })
    // )
    // const year = parseInt(now.toLocaleString("default", { year: "numeric" }))

    // dayFilteredNews = yearFilteredNews.filter((e) => {
    //   const t1 =
    //     parseInt(e.frontmatter.day) >= day &&
    //     parseInt(e.frontmatter.monthNum) === month &&
    //     parseInt(e.frontmatter.year) === year
    //   const t2 =
    //     parseInt(e.frontmatter.monthNum) > month &&
    //     parseInt(e.frontmatter.year) >= year
    //   return t1 || t2
    // })
  }

  const offset = (page - 1) * recordsPerPage
  let pagedNews = dayFilteredNews.slice(offset, offset + recordsPerPage)

  const crumbs = [["News", "/news"]]

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      title="News"
      // titleComponent={
      //   <HideSmall>
      //     <SearchSummary
      //       count={news.length}
      //       single="News Item"
      //       plural="News Items"
      //     />
      //   </HideSmall>
      // }
      headerComponent={<SiteSearch />}
      menuComponent={<ShareLinks path={path} />}
      bgColorClass="bg-columbia-light-gray"
    >
      <FlHdDiv>
        <Container>
          {/* <Breadcrumb crumbs={crumbs} /> */}
          <Column>
            <MainColumn>
              <NewsSearchResults
                news={dayFilteredNews}
                pagedNews={pagedNews}
                page={page}
                recordsPerPage={recordsPerPage}
                onPageChanged={onPageChanged}
              />
            </MainColumn>
            <SideColumn className="pl-16">
              <div>
                <div className="text uppercase">Date Filter</div>
                <DayPicker
                  selectedDays={selectedDays}
                  onDayClick={handleDayClick}
                />
              </div>
            </SideColumn>
          </Column>
        </Container>
      </FlHdDiv>
    </CrumbTitleLayout>
  )
}

export default NewsTemplate
