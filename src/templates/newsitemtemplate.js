import React from "react"
import CrumbLayout from "../components/crumblayout"
import SideBarNews from "../components/news/sidebarnews"
import NewsItemDate from "../components/news/newsitemdate"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import NewsContent from "../components/news/newscontent"
import Collapsible from "../components/collapsible"
import Title from "../components/title"

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
    >
      <Column>
        <MainColumn>
          <div className="w-full">
            <div>
              <Title>{title}</Title>
            </div>
            <div>
              <NewsItemDate>{item.frontmatter.date}</NewsItemDate>

              <NewsContent html={item.html} />
            </div>
          </div>
        </MainColumn>
        <SideColumn>
          <Collapsible title="Recent News">
            <SideBarNews allNews={allNews} />
          </Collapsible>
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default NewsItemTemplate
