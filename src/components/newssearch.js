import React, { useState } from "react"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import NewsYearFilter from "./newsyearfilter"
import NewsMonthFilter from "./newsmonthfilter"
import Collapsible from "./collapsible"
import SearchCount from "./searchcount"
import NewsItems from "./newsitems"

const EMPTY_QUERY = ""

const NewsSearch = ({ allNews }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredNews, setFilteredNews] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [yearsFilter, setYearsFilter] = useState(new Set())

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
    console.log(currentPage)

    setPage(currentPage)
  }

  const handleClick = data => {
    setYearsFilter(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let news = hasSearchResults ? filteredNews : allNews

  let yearFilteredNews

  if (yearsFilter.size > 0) {
    yearFilteredNews = news.filter(item => {
      return yearsFilter.has(item.frontmatter.year)
    })
  } else {
    yearFilteredNews = news
  }

  const offset = (page - 1) * recordsPerPage
  let pagedNews = yearFilteredNews.slice(offset, offset + recordsPerPage)

  return (
    <>
      <div className="columns">
        <div className="column is-4">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find news items"
          />
          <Collapsible title="Year filter" height="auto">
            <NewsYearFilter news={news} handleClick={handleClick} />
          </Collapsible>
          <Collapsible title="Month filter" height="auto">
            <NewsMonthFilter news={news} handleClick={handleClick} />
          </Collapsible>
        </div>
        <div className="column">
          <div>
            <SearchCount>{yearFilteredNews.length}</SearchCount>{" "}
            {yearFilteredNews.length === 1 ? "News Item" : "News Items"} found
          </div>
          <NewsItems news={pagedNews} />

          <Pagination
            page={page}
            totalRecords={yearFilteredNews.length}
            recordsPerPage={recordsPerPage}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </>
  )
}

NewsSearch.defaultProps = {
  showLabLink: true,
}

export default NewsSearch
