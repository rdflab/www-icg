import React from "react"
import CrumbLayout from "../components/crumblayout"
import SideBarNews from "../components/news/sidebarnews"
import NewsItemDate from "../components/news/newsitemdate"
import H4 from "../components/headings/h4"
import Columns from "../components/columns"
import Column from "../components/column"

const NewsItemTemplate = props => {
  const { pageContext } = props
  const { item, allNews } = pageContext

  const title = item.frontmatter.title

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
      ]}
      title={title}
    >
      <Columns>
        <Column>
          <H4>{title}</H4>
          <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
          <div dangerouslySetInnerHTML={{ __html: item.html }} />
        </Column>
        <Column w={4}>
          <SideBarNews allNews={allNews} />
        </Column>
      </Columns>
    </CrumbLayout>
  )
}

export default NewsItemTemplate
