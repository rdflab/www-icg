import React from "react"
import CrumbLayout from "../components/crumblayout"
import SideBarNews from "../components/news/sidebarnews"
import NewsItemDate from "../components/news/newsitemdate"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import NewsContent from "../components/news/newscontent"

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
      <Column>
        <MainColumn>
          <div>
            <NewsItemDate>{item.frontmatter.date}</NewsItemDate>

            <NewsContent html={item.html} />
          </div>
        </MainColumn>
        <SideColumn>
          <SideBarNews allNews={allNews} />
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default NewsItemTemplate
