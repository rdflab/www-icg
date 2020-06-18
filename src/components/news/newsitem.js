import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../links/bluelink"

import HTMLDiv from "../htmldiv"

const NewsItem = ({ item }) => (
  <article className="mb-8 pb-4 border-b border-solid border-gray-300">
    <NewsItemDate item={item} />
    <h3>
      <BlueLink
        aria-label={`Goto news about ${item.frontmatter.title}`}
        to={item.frontmatter.path}
      >
        {item.frontmatter.title}
      </BlueLink>
    </h3>
    <HTMLDiv className="mt-2" html={item.excerpt} />
  </article>
)

export default NewsItem
