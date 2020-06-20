import React from "react"
import Pagination from "../pagination"
import NewsItems from "./newsitems"
import FullDiv from "../fulldiv"

const NewsSearchResults = ({
  news,
  pagedNews,
  page,
  recordsPerPage,
  onPageChanged,
}) => (
  <FullDiv>
    {/* <SearchSummary count={news.length} single="News Item" plural="News Items" /> */}

    <NewsItems news={pagedNews} />

    <Pagination
      page={page}
      totalRecords={news.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </FullDiv>
)

export default NewsSearchResults
