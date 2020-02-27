import React from "react"
import newsItemStyles from "./newsitem.module.scss"
import NewsItemDate from "./newsitemdate"
import BodyLink from "../bodylink"
import { Link } from "gatsby"

const SideBarNewsItem = ({ item }) => (
  <article className={newsItemStyles.newsSideBarItem}>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <div>
      <Link to={item.frontmatter.path} className={newsItemStyles.newsItemTitle}>
        {item.frontmatter.title}
      </Link>
    </div>
  </article>
)

export default SideBarNewsItem
