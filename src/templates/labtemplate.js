import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import Column from "../components/column"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import SmallColumn from "../components/smallcolumn"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import ContactInfo from "../components/people/contactinfo"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import Collapsible from "../components/collapsible"
import SectionBreak from "../components/sectionbreak"
import FlatCard from "../components/flatcard"
import SideBarMembers from "../components/people/sidebarmembers"
import { personName } from "../utils/personname"
import { labMembersUrl } from "../utils/urls"
import BlueLink from "../components/bluelink"
import SideBarMember from "../components/people/sidebarmember"
import H2 from "../components/headings/h2"
import H1 from "../components/headings/h1"

export const labName = faculty => {
  return `The ${personName(faculty)} Lab`
}

const PeopleGrid = ({ people, peopleMap, cols }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = peopleMap[people[pc]]

      col.push(
        <Column w={3}>
          {pc < people.length && (
            <div className={`w-full shadow  mb-8 md:mx-4`}>
              <div>{personName(person)}</div>
              <ContactInfo person={person} />
            </div>
          )}
        </Column>
      )

      ++pc

      if (pc === people.length) {
        break
      }
    }

    ret.push(<Column className="justify-center">{col}</Column>)

    if (pc === people.length) {
      break
    }
  }

  return ret
}

PeopleGrid.defaultProps = {
  cols: 4,
}

const Divisions = ({ lab, peopleMap }) => {
  const ret = []

  for (let division of lab.divisions) {
    if (division.people.length > 0) {
      ret.push(<H2>{division.name}</H2>)
      ret.push(<PeopleGrid people={division.people} peopleMap={peopleMap} />)
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
      <H1>{title}</H1>

      <Column>
        <MainColumn>
          <div className="w-full">
            <HTMLDiv html={labExcerptHtml} />

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

            <Divisions lab={lab} peopleMap={peopleMap} />

            {labPublications.length > 0 && (
              <div className="my-8">
                <SectionBreak>
                  <Collapsible
                    title="Recent Publications"
                    height="auto"
                    headerClassName="text-blue-700"
                  >
                    {/* <RecentPublications
                      group={group}
                      publications={labPublications}
                    /> */}
                  </Collapsible>
                </SectionBreak>
              </div>
            )}
          </div>
        </MainColumn>
        <SideColumn>
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
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default LabTemplate
