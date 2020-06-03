import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../links/bluelink"

import HTMLDiv from "../htmldiv"

const NewsItem = ({ item }) => (
  <article className="mb-8 pb-4">
    <NewsItemDate item={item} />
    <h3>
      <BlueLink
        aria-label={`Goto news about ${item.frontmatter.title}`}
        to={item.frontmatter.path}
      >
        {item.frontmatter.title}
      </BlueLink>
    </h3>
    <HTMLDiv html={item.excerpt} />
  </article>
)

export default NewsItem
