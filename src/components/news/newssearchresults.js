import React from "react"
import Pagination from "../pagination"
import NewsItems from "./newsitems"

const NewsSearchResults = ({
  news,
  pagedNews,
  page,
  recordsPerPage,
  onPageChanged,
}) => (
  <div className="mt-8">
    {/* <SearchSummary count={news.length} single="News Item" plural="News Items" /> */}

    <NewsItems news={pagedNews} />

    <Pagination
      page={page}
      totalRecords={news.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </div>
)

export default NewsSearchResults
