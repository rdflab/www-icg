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
import { Link } from "gatsby"
import styled from "styled-components"
import URLLink from "../urllink"

const PersonDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <PersonDiv>
      <Columns>
        <Column w="1/2">
          <div>
            <Link
              to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
            >
              {person.frontmatter.firstName} {person.frontmatter.lastName}
            </Link>
          </div>
          <div style={{ color: "gray" }}>{person.frontmatter.titles[0]}</div>
        </Column>
        <Column w="1/2">
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
      </Columns>
    </PersonDiv>
  )
}

export default Person
