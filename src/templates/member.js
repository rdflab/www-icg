import React from "react"
import CrumbLayout from "../components/crumblayout"
import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import H5 from "../components/headings/h5"
import { Link } from "gatsby"
import styled from "styled-components"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URLLink from "../components/urllink"

const StyledInterest = styled.div`
  border-top: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const StyledInterestHeader = styled.div`
  font-size: large;
`

const StyledInterestLink = styled(Link)`
  font-size: large;
`

const interests = (person, researchAreasMap) => {
  let items = {}

  for (let i = 0; i < person.frontmatter.researchAreas.length; ++i) {
    const researchArea = researchAreasMap[person.frontmatter.researchAreas[i]]

    items[researchArea.name] = researchArea
  }

  let keys = Object.keys(items).sort()

  let ret = []

  for (let i = 0; i < keys.length; ++i) {
    const researchArea = items[keys[i]]

    ret.push(
      <StyledInterestLink key={i} to={`/research-areas/${researchArea.id}`}>
        {researchArea.name}
      </StyledInterestLink>
    )

    if (i < keys.length - 1) {
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
        [
          `${title}`,
          `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
        ],
      ]}
      title={title}
    >
      <Columns>
        <Column w={4} className="is-hidden-tablet">
          <H5>{person.frontmatter.titles[0]}</H5>
          {person.frontmatter.email.length > 0 && (
            <EmailLink to={person.frontmatter.email[0]} />
          )}
          {person.frontmatter.phone.length > 0 && (
            <PhoneLink numbers={person.frontmatter.phone} />
          )}
          {person.frontmatter.urls.length > 0 && (
            <URLLink urls={person.frontmatter.urls} />
          )}
        </Column>
        <Column>
          {person.frontmatter.researchAreas.length > 0 && (
            <StyledInterest>
              <StyledInterestHeader>Research Interests</StyledInterestHeader>

              {interests(person, researchAreasMap)}
            </StyledInterest>
          )}
        </Column>
        <Column w={4} className="is-hidden-mobile">
          <SideBar>
            <H5>{person.frontmatter.titles[0]}</H5>
            {person.frontmatter.email.length > 0 && (
              <EmailLink to={person.frontmatter.email[0]} />
            )}
            {person.frontmatter.phone.length > 0 && (
              <PhoneLink numbers={person.frontmatter.phone} />
            )}
            {person.frontmatter.urls.length > 0 && (
              <URLLink urls={person.frontmatter.urls} />
            )}
          </SideBar>

          <SideBarMembers lab={lab} people={labPeople} />
        </Column>
      </Columns>
    </CrumbLayout>
  )
}

export default MemberTemplate
