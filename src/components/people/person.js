/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Columns from "../columns"
import Column from "../column"
import EmailLink from "../emaillink"
import PhoneLink from "../phonelink"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import styled from "styled-components"
import URLLink from "../urllink"
import BlueLink from "../bluelink"

const PersonDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <PersonDiv>
      <Columns>
        <MainColumn w="7/12">
          <div>
            <BlueLink
              to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
            >
              {person.frontmatter.firstName} {person.frontmatter.lastName}
            </BlueLink>
          </div>
          <div style={{ color: "gray" }}>{person.frontmatter.titles[0]}</div>
        </MainColumn>
        <SideColumn w="5/12">
          {person.frontmatter.email.length > 0 && (
            <EmailLink to={person.frontmatter.email[0]} />
          )}
          {person.frontmatter.phone.length > 0 && (
            <PhoneLink numbers={person.frontmatter.phone} />
          )}
          {person.frontmatter.urls.length > 0 && (
            <URLLink urls={person.frontmatter.urls} />
          )}
        </SideColumn>
      </Columns>
    </PersonDiv>
  )
}

export default Person
