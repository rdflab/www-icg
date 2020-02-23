import React from "react"
import Card from "./card"
import newsItemStyles from "./newsitem.module.scss"
import { Link } from "gatsby"
import NewsItemDate from "./newsitemdate"

const NewsItem = ({ item }) => (
  <article className={newsItemStyles.newsItem}>
    <Card>
      <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
      <div>
        <Link
          to={item.frontmatter.path}
          className={newsItemStyles.newsItemTitle}
        >
          {item.frontmatter.title}
        </Link>
      </div>

      <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
    </Card>
  </article>
)

export default NewsItem
