import React from "react"
import Card from "./card"
import newsItemStyles from "./newsitem.module.scss"
import NewsItemDate from "./newsitemdate"
import BodyLink from "./bodylink"

const NewsItem = ({ item }) => (
  <article className={newsItemStyles.newsItem}>
    <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
    <div>
      <BodyLink
        to={item.frontmatter.path}
        className={newsItemStyles.newsItemTitle}
      >
        {item.frontmatter.title}
      </BodyLink>
    </div>

    <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
  </article>
)

export default NewsItem
