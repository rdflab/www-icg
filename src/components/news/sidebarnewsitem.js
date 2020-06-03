import React from "react"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../links/bluelink"

const SideBarNewsItem = ({ item }) => (
  <article className="mb-4 pb-4">
    <NewsItemDate item={item} />
    <div>
      <BlueLink to={item.frontmatter.path}>{item.frontmatter.title}</BlueLink>
    </div>
  </article>
)

export default SideBarNewsItem
