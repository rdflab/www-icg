import React from "react"
import Card from "./card"
import newsItemStyles from "./newsitem.module.scss"
import { Link } from "gatsby"

const NewsItem = ({ item }) => (
  <article className={newsItemStyles.newsItem}>
    <Card>
        <div className={newsItemStyles.newsItemDate}>{item.frontmatter.date}</div>
        <div><Link to={item.frontmatter.path} className={newsItemStyles.newsItemTitle}>{item.frontmatter.title}</Link></div>
        
          
        <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
    </Card>
  </article>
)

export default NewsItem