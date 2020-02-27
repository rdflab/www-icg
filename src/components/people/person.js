/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import personStyles from "./person.module.scss"
import Columns from "../columns"
import Column from "../column"
import EmailLink from "../emaillink"
import { Link } from "gatsby"
import styled from "styled-components"

const PersonDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <PersonDiv>
      <Columns>
        <Column>
          <div>
            <Link
              to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
            >
              {person.frontmatter.firstName} {person.frontmatter.lastName}
            </Link>
          </div>
          <div style={{ color: "gray" }}>{person.frontmatter.titles[0]}</div>
        </Column>
        <Column w={5}>
          {person.frontmatter.email.length > 0 !== "" && (
            <EmailLink to={person.frontmatter.email[0]} />
          )}
        </Column>
      </Columns>
    </PersonDiv>
  )
}

export default Person
