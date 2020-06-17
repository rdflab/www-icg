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
import ShareLinks from "../components/share/sharelinks"

const NewsItemTemplate = ({ path, pageContext }) => {
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
      path={path}
      nav="News Article"
      title={title}
      crumbs={[["News", "/news"]]}
      menuComponent={<ShareLinks path={path} />}
    >
      <Container className="my-16">
        <Column>
          <MainColumn className="mr-16">
            <FullDiv>
              <NewsItemDate item={item} />

              <NewsContent html={item.html} />
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
