import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import Container from "../components/container"
import PeopleGroups from "../components/people/peoplegroups"
import { labName } from "../utils/labname"
import LabHeader from "../components/lab/labheader"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import ShowBetween from "../components/showbetween"

const LabTemplate = ({ path, pageContext }) => {
  const {
    lab,
    crumbs,
    faculty,
    labPublications,
    labNews,
    labExcerptHtml,
  } = pageContext

  const title = labName(faculty)

  return (
    <CrumbLayout crumbs={crumbs} title={title} headerContent={<SiteSearch />}>
      {/* <PersonHeader person={faculty} title="Labs" /> */}

      <LabHeader person={faculty} path={path} />

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

      <div>
        <HTMLDiv html={labExcerptHtml} />

        <div className="py-8">
          <Container>
            <H1>Meet The Team</H1>

            <ShowSmall size="lg">
              <PeopleGroups
                groupMap={lab.groupMap}
                cols={2}
                colWidth="w-9/20"
              />
            </ShowSmall>

            <ShowBetween s1="lg" s2="xl">
              <PeopleGroups
                groupMap={lab.groupMap}
                cols={3}
                colWidth="w-3/10"
              />
            </ShowBetween>

            <HideSmall size="xl">
              <PeopleGroups groupMap={lab.groupMap} />
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

        {/* <div className="mt-8">
            <SideBarMembers
              group={group}
              people={group.leaders}
              title="Faculty"
            />
          </div> */}
      </div>
    </CrumbLayout>
  )
}

export default LabTemplate
