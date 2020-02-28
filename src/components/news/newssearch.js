import React, { useState } from "react"
import Pagination from "../pagination"
import SearchBar from "../searchbar"
import NewsYearFilter from "./newsyearfilter"
import FilterNewsMonth from "../filter/filternewsmonth"
import Collapsible from "../collapsible"
import SearchCount from "../searchcount"
import NewsItems from "./newsitems"
import SearchSummary from "../searchsummary"
import SideBar from "../sidebar/sidebar"
import Columns from "../columns"
import Column from "../column"

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
    <Columns>
      <Column w={4} className="is-hidden-tablet">
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find news items"
        />
      </Column>
      <Column>
        <SearchSummary
          count={yearFilteredNews.length}
          single="News Item"
          plural="News Items"
        />

        <NewsItems news={pagedNews} />

        <Pagination
          page={page}
          totalRecords={yearFilteredNews.length}
          recordsPerPage={recordsPerPage}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </Column>
      <Column w={4} className="is-hidden-mobile">
        <SideBar>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find news items"
          />
          <Collapsible title="Year filter" height="auto">
            <NewsYearFilter news={news} handleClick={handleClick} />
          </Collapsible>
          <Collapsible title="Month filter" height="auto">
            <FilterNewsMonth news={news} handleClick={handleClick} />
          </Collapsible>
        </SideBar>
      </Column>
    </Columns>
  )
}

NewsSearch.defaultProps = {
  showLabLink: true,
}

export default NewsSearch
