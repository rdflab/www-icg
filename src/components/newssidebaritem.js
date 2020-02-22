import React from "react"
import NewsItem from "./newsitem"
import newsItemStyles from "./newsitem.module.scss"
import { Link } from "gatsby"

const NewsSideBarItem = ({ item }) => (
  <article className={newsItemStyles.newsSideBarItem}>
    <div className={newsItemStyles.newsItemDate}>{item.frontmatter.date}</div>
    <div>
      <Link to={item.frontmatter.path} className={newsItemStyles.newsItemTitle}>
        {item.frontmatter.title}
      </Link>
    </div>
  </article>
)

export default NewsSideBarItem
