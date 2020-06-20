import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import NewsSearchResults from "../components/news/newssearchresults"
import SmallContainer from "../components/smallcontainer"
import Container from "../components/container"
import ShareLinks from "../components/share/sharelinks"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import DayPicker from "react-day-picker"

const EMPTY_QUERY = ""

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

  const handleDayClick = (day, { selected }) => {}

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

  const offset = (page - 1) * recordsPerPage
  let pagedNews = yearFilteredNews.slice(offset, offset + recordsPerPage)

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={[["News", "/news"]]}
      nav="News"
      title="Institute News"
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
      headerFloat={true}
      backgroundColor="bg-columbia-light-gray"
    >
      <div className="pt-48 md:pt-64 lg:pt-80">
        <Container>
          <Column>
            <MainColumn className="md:mr-8">
              <NewsSearchResults
                news={yearFilteredNews}
                pagedNews={pagedNews}
                page={page}
                recordsPerPage={recordsPerPage}
                onPageChanged={onPageChanged}
              />
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

export default NewsTemplate
