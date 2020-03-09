import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import toGroupMap from "../utils/togroupmap"
import Columns from "../components/columns"
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
import GlobalSearch from "../components/search/globalsearch"

const LabTemplate = ({ pageContext }) => {
  const {
    group,
    peopleMap,
    labPublications,
    labNews,
    labExcerptHtml,
    searchData,
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
    <CrumbLayout
      crumbs={crumbs}
      title={title}
      headerComponent={
        <HideSmall className="w-1/3">
          <GlobalSearch searchData={searchData} />
        </HideSmall>
      }
    >
      <Columns>
        <SmallColumn>
          <ContactInfo person={faculty} urls={group.urls} />
        </SmallColumn>
        <MainColumn>
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
              <RecentPublications
                className="sm:hidden"
                group={group}
                publications={labPublications}
                groupMap={groupMap}
                peopleMap={peopleMap}
              />
              <Card className="hidden sm:block">
                <RecentPublications
                  group={group}
                  publications={labPublications}
                  groupMap={groupMap}
                  peopleMap={peopleMap}
                />
              </Card>
            </div>
          )}
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <ContactInfo person={faculty} urls={group.urls} />
          {/* </SideBar> */}

          {labNews.length > 0 && (
            <div className="mt-4">
              <h3>News</h3>
              <SideBarNews allNews={labNews} />
            </div>
          )}
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default LabTemplate
