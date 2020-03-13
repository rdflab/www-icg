import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import toGroupMap from "../utils/togroupmap"
import Column from "../components/column"
import Button from "../components/button"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import SmallColumn from "../components/smallcolumn"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import Card from "../components/card"
import ContactInfo from "../components/people/contactinfo"
import HTMLDiv from "../components/htmldiv"
import HideSmall from "../components/hidesmall"
import SiteSearch from "../components/search/sitesearch"
import Collapsible from "../components/collapsible"
import SectionBreak from "../components/sectionbreak"
import FlatCard from "../components/flatcard"
import SideBarMembers from "../components/people/sidebarmembers"
import { personName } from "../utils/personname"
import { labMembersUrl } from "../utils/urls"
import BlueLink from "../components/bluelink"

export const labName = faculty => {
  return `The ${personName(faculty)} Lab`
}

const LabTemplate = ({ pageContext }) => {
  const {
    group,
    labPeople,
    labPublications,
    labNews,
    labExcerptHtml,
  } = pageContext

  const faculty = group.leaders[0]

  const title = labName(faculty)

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [personName(faculty), `/research-areas/labs/${group.frontmatter.id}`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={title} headerComponent={<SiteSearch />}>
      <Column>
        <SmallColumn>
          <ContactInfo person={faculty} urls={group.urls} />
        </SmallColumn>
        <MainColumn>
          <div>
            <HTMLDiv html={labExcerptHtml} />

            <div className="text-center">
              <Button
                to={`/research-areas/labs/${group.frontmatter.id}/overview`}
              >
                Learn more
              </Button>
            </div>

            <h3>Research Focus</h3>
            <h3>Education</h3>

            {labPublications.length > 0 && (
              <div className="my-8">
                <SectionBreak>
                  <Collapsible title="Recent Publications" height="auto">
                    <RecentPublications
                      group={group}
                      publications={labPublications}
                    />
                  </Collapsible>
                </SectionBreak>
              </div>
            )}
          </div>
        </MainColumn>
        <SideColumn>
          <FlatCard>
            <ContactInfo person={group.leaders[0]} urls={group.urls} />
          </FlatCard>

          {labNews.length > 0 && (
            <div className="mt-8">
              <h3>News</h3>
              <SideBarNews allNews={labNews} />
            </div>
          )}

          <div className="mt-8">
            <SideBarMembers
              group={group}
              people={group.leaders}
              title="Faculty"
            />
          </div>

          <div className="mt-8">
            <SideBarMembers group={group} people={labPeople} maxRecords={5} />
            <div className="mt-2">
              <BlueLink to={labMembersUrl(group)}>More</BlueLink>
            </div>
          </div>
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default LabTemplate
