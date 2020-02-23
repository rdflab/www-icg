import React from "react"
import NewsItem from "./newsitem"
import newsItemStyles from "./newsitem.module.scss"
import { Link } from "gatsby"
import NewsItemDate from "./newsitemdate"

const NewsSideBarItem = ({ item }) => (
  <article className={newsItemStyles.newsSideBarItem}>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <div>
      <Link to={item.frontmatter.path} className={newsItemStyles.newsItemTitle}>
        {item.frontmatter.title}
      </Link>
    </div>
  </article>
)

export default NewsSideBarItem
