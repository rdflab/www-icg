import React from "react"
import newsItemStyles from "./newsitem.module.scss"
import NewsItemDate from "./newsitemdate"
import BodyLink from "./bodylink"

const SideBarNewsItem = ({ item }) => (
  <article className={newsItemStyles.newsSideBarItem}>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <div>
      <BodyLink
        to={item.frontmatter.path}
        className={newsItemStyles.newsItemTitle}
      >
        {item.frontmatter.title}
      </BodyLink>
    </div>
  </article>
)

export default SideBarNewsItem
