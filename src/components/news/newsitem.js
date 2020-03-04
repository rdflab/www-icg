import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../bluelink"
import NewsContent from "./newscontent"

const NewsItem = ({ item }) => (
  <article className="mb-8 pb-4 border-b border-solid gray-border">
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <BlueLink to={item.frontmatter.path}>{item.frontmatter.title}</BlueLink>

    <NewsContent html={item.excerpt} />
  </article>
)

export default NewsItem
