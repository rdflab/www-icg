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

const LabTemplate = ({ pageContext }) => {
  const {
    group,
    peopleMap,
    labPublications,
    labNews,
    labExcerptHtml,
  } = pageContext

  const groupMap = toGroupMap([group])

  const faculty = peopleMap[group.frontmatter.leaders[0]]

  const title = `The ${faculty.frontmatter.lastName} Lab`

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [title, `/research-areas/labs/${group.frontmatter.id}`],
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
                      groupMap={groupMap}
                      peopleMap={peopleMap}
                    />
                  </Collapsible>
                </SectionBreak>
              </div>
            )}
          </div>
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <FlatCard>
            <ContactInfo person={faculty} urls={group.urls} />
          </FlatCard>
          {/* </SideBar> */}

          {labNews.length > 0 && (
            <div className="mt-8">
              <h3>News</h3>
              <SideBarNews allNews={labNews} />
            </div>
          )}
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default LabTemplate
