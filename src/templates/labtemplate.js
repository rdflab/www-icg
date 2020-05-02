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
import PeopleGrid from "../components/people/peoplegrid"
import PersonHeader from "../components/people/personheader"

export const labName = faculty => {
  return `The ${personName(faculty)} Lab`
}

const Divisions = ({ lab, peopleMap, faculty }) => {
  const ret = []

  for (let division of lab.divisions) {
    if (division.people.length > 0) {
      ret.push(
        // <Column className="mb-4 shadow">
        //   <Column className="w-2/10">
        //     <div className="text-white p-4 bg-gray-500 w-full h-full">
        //       <h3>{division.name}</h3>
        //     </div>
        //   </Column>
        //   <Column className="w-8/10 bg-white">
        //     <PeopleGrid
        //       people={division.people}
        //       peopleMap={peopleMap}
        //       cols={3}
        //     />
        //   </Column>
        // </Column>

        <div className="mb-4">
          <PeopleGrid
            name={division.name}
            people={division.people}
            peopleMap={peopleMap}
            faculty={faculty}
            cols={3}
          />
        </div>
      )
    }
  }

  return ret
}

const LabTemplate = ({ pageContext }) => {
  const {
    lab,
    peopleMap,
    labPublications,
    labNews,
    labExcerptHtml,
  } = pageContext

  const faculty = peopleMap[lab.id]

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
        <Divisions lab={lab} peopleMap={peopleMap} faculty={faculty} />
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
