import React from "react"
import NewsItem from "./newsitem"

const NewsItems = ({ news }) => (
  <>
    {news.map((item, index) => (
      <NewsItem key={index} item={item} />
    ))}
  </>
)

export default NewsItems