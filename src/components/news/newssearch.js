import React, { useState } from "react"
import Pagination from "../pagination"
import SearchBar from "../search/searchbar"
import NewsYearFilter from "./newsyearfilter"
import FilterNewsMonth from "./filternewsmonth"
import Collapsible from "../collapsible"
import NewsItems from "./newsitems"
import SearchSummary from "../search/searchsummary"
//import SideBar from "../sidebar/sidebar"
import Column from "../column"
import SmallColumn from "../smallcolumn"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import NewsSearchResults from "../news/newssearchresults"

const EMPTY_QUERY = ""

const NewsSearch = ({ allNews }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredNews, setFilteredNews] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [FilterYears, setFilterYears] = useState(new Set())

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
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let news = hasSearchResults ? filteredNews : allNews

  let yearFilteredNews

  if (FilterYears.size > 0) {
    yearFilteredNews = news.filter(item => {
      return FilterYears.has(item.frontmatter.year)
    })
  } else {
    yearFilteredNews = news
  }

  const offset = (page - 1) * recordsPerPage
  let pagedNews = yearFilteredNews.slice(offset, offset + recordsPerPage)

  return (
    <Column>
      <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find news items"
        />
      </SmallColumn>
      <MainColumn>
        <NewsSearchResults
          news={yearFilteredNews}
          pagedNews={pagedNews}
          page={page}
          recordsPerPage={recordsPerPage}
          onPageChanged={onPageChanged}
        />
      </MainColumn>
      <SideColumn>
        {/* <SideBar> */}
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find news items"
        />
        <Collapsible title="Filter By Year" height="auto">
          <NewsYearFilter news={news} handleClick={handleClick} />
        </Collapsible>
        <Collapsible title="Filter By Month" height="auto">
          <FilterNewsMonth news={news} handleClick={handleClick} />
        </Collapsible>
        {/* </SideBar> */}
      </SideColumn>
    </Column>
  )
}

NewsSearch.defaultProps = {
  showLabLink: true,
}

export default NewsSearch
