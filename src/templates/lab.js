import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import toLabMap from "../utils/tolabmap"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URLLink from "../components/urllink"
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

const LabTemplate = props => {
  const { pageContext } = props
  const {
    lab,
    peopleMap,
    labPublications,
    labNews,
    labExcerptHtml,
    labHtml,
  } = pageContext

  const labs = [lab] //toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

  const faculty = peopleMap[lab.leaders[0]]

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [
      `${faculty.frontmatter.firstName} ${faculty.frontmatter.lastName}`,
      `/research-areas/labs/${lab.id}`,
    ],
  ]

  return (
    <CrumbLayout
      crumbs={crumbs}
      title={`The ${faculty.frontmatter.lastName} Lab`}
    >
      <Columns>
        <SmallColumn>
          <ContactInfo person={faculty} urls={lab.urls} />
        </SmallColumn>
        <MainColumn>
          <HTMLDiv html={labExcerptHtml} />

          <div className="text-center">
            <Button to={`/research-areas/labs/${lab.id}/overview`}>
              Learn more
            </Button>
          </div>

          <h2>{`${faculty.frontmatter.firstName} ${faculty.frontmatter.lastName}`}</h2>
          <h3>Research Focus</h3>
          <h3>Education</h3>

          {labPublications.length > 0 && (
            <Card className="mt-8">
              <RecentPublications
                lab={lab}
                publications={labPublications}
                labMap={labMap}
                peopleMap={peopleMap}
              />
            </Card>
          )}
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <ContactInfo person={faculty} urls={lab.urls} />
          {/* </SideBar> */}

          <h3>News</h3>
          <SideBarNews allNews={labNews} />
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default LabTemplate
