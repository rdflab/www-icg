import React from "react"
import newsItemStyles from "./newsitem.module.scss"
import NewsItemDate from "./newsitemdate"
import BlueLink from "../bluelink"

const SideBarNewsItem = ({ item }) => (
  <article className={newsItemStyles.newsSideBarItem}>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <div>
      <BlueLink to={item.frontmatter.path}>{item.frontmatter.title}</BlueLink>
    </div>
  </article>
)

export default SideBarNewsItem
