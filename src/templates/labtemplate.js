import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import { personName } from "../utils/personname"
import H1 from "../components/headings/h1"
import Container from "../components/container"
import PersonHeader from "../components/people/personheader"
import PeopleGroups from "../components/people/peoplegroups"
import { labName } from "../utils/labname"

const LabTemplate = ({ pageContext }) => {
  const {
    lab,
    faculty,
    labGroupMap,
    labPublications,
    labNews,
    labExcerptHtml,
  } = pageContext

  const title = labName(faculty)

  const crumbs = [
    ["Labs", "/research-areas/labs"],
    [personName(faculty), `/research-areas/labs/${lab.id}`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={title} headerComponent={<SiteSearch />}>
      <PersonHeader person={faculty} title="Labs" />

      {/* <div className="text-center">
              <Button
                to={`/research-areas/labs/${group.frontmatter.id}/overview`}
              >
                Learn more
              </Button>
            </div> */}
      {/* 
            <h3>Research Focus</h3>
            <h3>Education</h3> */}

      <HTMLDiv html={labExcerptHtml} />

      <Container>
        <H1>Meet the team</H1>
        <PeopleGroups
          groupMap={labGroupMap}
          faculty={faculty}
          cols={4}
          colWidth="w-2/10"
        />
      </Container>

      {labPublications.length > 0 && (
        <div className="py-8">
          <Container>
            <H1>Recent Publications</H1>

            <RecentPublications lab={lab} publications={labPublications} />
          </Container>
        </div>
      )}

      {/* {labPublications.length > 0 && (
              <div className="my-8">
                <SectionBreak>
                  <Collapsible
                    title="Recent Publications"
                    height="auto"
                    headerClassName="text-blue-700"
                  >
                    <RecentPublications lab={lab} publications={labPublications}/>
                  </Collapsible>
                </SectionBreak>
              </div>
            )} */}

      {labNews.length > 0 && (
        <div className="mt-8">
          <h3>News</h3>
          <SideBarNews allNews={labNews} />
        </div>
      )}

      {/* <div className="mt-8">
            <SideBarMembers
              group={group}
              people={group.leaders}
              title="Faculty"
            />
          </div> */}
    </CrumbLayout>
  )
}

export default LabTemplate
