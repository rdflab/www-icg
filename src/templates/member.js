import React from "react"
import CrumbLayout from "../components/crumblayout"
import Columns from "../components/columns"
//import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URLLink from "../components/urllink"
import SmallColumn from "../components/smallcolumn"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import BlueLink from "../components/bluelink"
import ContactInfo from "../components/people/contactinfo"

const interests = person => {
  const n = person.researchAreas.length

  let ret = []

  for (let i = 0; i < n; ++i) {
    const researchArea = person.researchAreas[i]

    ret.push(
      <BlueLink key={i} to={`/research-areas/${researchArea.id}`}>
        {researchArea.name}
      </BlueLink>
    )

    if (i < n - 1) {
      ret.push(", ")
    }
  }

  return <div>{ret}</div>
}

const MemberTemplate = props => {
  const { pageContext } = props
  const { person, lab, labPeople, researchAreasMap } = pageContext

  const title = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
        [title, `/research-areas/faculty-and-staff/${person.frontmatter.id}`],
      ]}
      title={title}
    >
      <Columns>
        <SmallColumn>
          <h1 className="text-blue-columbia mb-4">
            {person.frontmatter.titles[0]}
          </h1>

          <ContactInfo person={person} />
        </SmallColumn>
        <MainColumn></MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <h1 className="text-blue-columbia mb-4">
            {person.frontmatter.titles[0]}
          </h1>

          <ContactInfo person={person} />
          {/* </SideBar> */}

          {person.frontmatter.researchAreas.length > 0 && (
            <div className="mt-4">
              <h2>Research Interests</h2>

              {interests(person, researchAreasMap)}
            </div>
          )}

          <SideBarMembers lab={lab} people={labPeople} />
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default MemberTemplate
