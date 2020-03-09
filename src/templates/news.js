import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SiteSearch from "../components/search/sitesearch"
import YearSelector from "../components/filter/yearselector"
import HideSmall from "../components/hidesmall"
import NewsSearchResults from "../components/news/newssearchresults"

const EMPTY_QUERY = ""

const NewsTemplate = ({ pageContext }) => {
  const { allNews, searchData } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredNews, setFilteredNews] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState([])

  const handleInputChange = e => {
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

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = data => {
    console.log("year", data)
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let news = hasSearchResults ? filteredNews : allNews

  let yearFilteredNews

  if (filterYears.length > 0 && filterYears[0] !== "All") {
    yearFilteredNews = news.filter(item => {
      return filterYears.includes(item.year)
    })
  } else {
    yearFilteredNews = news
  }

  const offset = (page - 1) * recordsPerPage
  let pagedNews = yearFilteredNews.slice(offset, offset + recordsPerPage)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
      ]}
      title="News"
      headerComponent={<SiteSearch searchData={searchData} />}
    >
      <HideSmall>
        <YearSelector onClick={handleClick} />
      </HideSmall>

      <NewsSearchResults
        news={yearFilteredNews}
        pagedNews={pagedNews}
        page={page}
        recordsPerPage={recordsPerPage}
        onPageChanged={onPageChanged}
      />
    </CrumbLayout>
  )
}

export default NewsTemplate
