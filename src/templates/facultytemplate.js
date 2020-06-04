import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"

import RecentPublications from "../components/publication/recentpublications"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import Container from "../components/container"
import PeopleGroups from "../components/people/peoplegroups"
import Img from "gatsby-image"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import ShowBetween from "../components/showbetween"
import BackgroundImage from "gatsby-background-image"
import { graphql } from "gatsby"
import styled from "styled-components"

const BackgroundSection = ({ file, children }) => (
  <BackgroundImage
    fluid={file.childImageSharp.fluid}
    style={{ width: "100%", height: "32rem" }}
  >
    {children}
  </BackgroundImage>
)

const StyledBackgroundSection = (backgroundSection) =>
  styled(backgroundSection)`
    width: 100%;
    height: 24rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  `

const FacultyTemplate = ({ path, pageContext, data }) => {
  const {
    id,
    person,
    lab,
    crumbs,
    labGroupMap,
    labPublications,
    labNews,
    excerptHtml,
    html,
  } = pageContext

  let img = null

  console.log(data)

  for (let { node } of data.files.edges) {
    console.log(node)
    const file = node

    if (file.relativePath.includes(id)) {
      img = <BackgroundSection file={file} />
      break
    }
  }

  return (
    <CrumbTitleLayout
      nav="Faculty"
      title={person.frontmatter.name}
      crumbs={crumbs}
      headerComponent={<SiteSearch />}
    >
      {img !== null && img}

      <div>
        <HTMLDiv html={excerptHtml} />

        <div className="py-8">
          <Container>
            <H1>Meet The Team</H1>

            <ShowSmall size="lg">
              <PeopleGroups groupMap={labGroupMap} cols={2} colWidth="w-9/20" />
            </ShowSmall>

            <ShowBetween s1="lg" s2="xl">
              <PeopleGroups groupMap={labGroupMap} cols={3} colWidth="w-3/10" />
            </ShowBetween>

            <HideSmall size="xl">
              <PeopleGroups groupMap={labGroupMap} />
            </HideSmall>

            {/* <PeopleGroups groupMap={labGroupMap} /> faculty={faculty} /> */}
          </Container>
        </div>

        {labPublications.length > 0 && (
          <div className="py-16">
            <Container>
              <H1>Recent Publications</H1>

              <RecentPublications lab={lab} publications={labPublications} />
            </Container>
          </div>
        )}

        {labNews.length > 0 && (
          <div className="mt-8">
            <h3>News</h3>
            <SideBarNews allNews={labNews} />
          </div>
        )}
      </div>
    </CrumbTitleLayout>
  )
}

export default FacultyTemplate

export const query = graphql`
  query {
    files: allFile(filter: { absolutePath: { regex: "/images/faculty/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
