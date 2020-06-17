import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import NewsSearchResults from "../components/news/newssearchresults"
import Container from "../components/container"
import ShareLinks from "../components/share/sharelinks"
// import MainColumn from "../components/maincolumn"
// import SideColumn from "../components/sidecolumn"

const EMPTY_QUERY = ""

const NewsTemplate = ({ path, pageContext }) => {
  const { allNews } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredNews, setFilteredNews] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState([])

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
    >
      <Container className="my-16">
        {/* <HideSmall>
          <Column isVCentered={true} isCentered={true}>
              <YearSelector onClick={handleClick} />
          </Column>
        </HideSmall> */}
        <NewsSearchResults
          news={yearFilteredNews}
          pagedNews={pagedNews}
          page={page}
          recordsPerPage={recordsPerPage}
          onPageChanged={onPageChanged}
        />
      </Container>
    </CrumbTitleLayout>
  )
}

export default NewsTemplate
