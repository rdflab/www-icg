import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SideBarNews from "../components/news/sidebarnews"
import NewsItemDate from "../components/news/newsitemdate"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import NewsContent from "../components/news/newscontent"
import Collapsible from "../components/collapsible"
import Container from "../components/container"
import FullDiv from "../components/fulldiv"

const NewsItemTemplate = props => {
  const { pageContext } = props
  const { item, allNews } = pageContext

  // if (item.date === undefined) {
  //   item.date = new Date(item.frontmatter.date)
  // }

  // for (let ni of allNews) {
  //   if (ni.date === undefined) {
  //     ni.date = new Date(ni.frontmatter.date)
  //   }
  // }

  const title = item.frontmatter.title

  return (
    <CrumbTitleLayout
      nav="News Article"
      title={title}
      crumbs={[["News", "/news"]]}
    >
      <Container className="py-8">
        <Column>
          <MainColumn className="mr-16">
            <FullDiv>
              <div>
                <NewsItemDate item={item} />

                <NewsContent html={item.html} />
              </div>
            </FullDiv>
          </MainColumn>
          <SideColumn>
            <Collapsible title="Recent News">
              <SideBarNews allNews={allNews} />
            </Collapsible>
          </SideColumn>
        </Column>
      </Container>
    </CrumbTitleLayout>
  )
}

export default NewsItemTemplate
