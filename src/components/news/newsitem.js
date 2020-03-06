import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../bluelink"

import HTMLDiv from "../htmldiv"

const NewsItem = ({ item }) => (
  <article className="mb-8 pb-4 border-b border-solid gray-border">
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <BlueLink
      aria-label={`Goto news about ${item.frontmatter.title}`}
      to={item.frontmatter.path}
    >
      {item.frontmatter.title}
    </BlueLink>

    <HTMLDiv html={item.excerpt} />
  </article>
)

export default NewsItem
