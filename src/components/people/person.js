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
            <Link to={`/research-areas/faculty-and-staff/${person.id}`}>
              {person.firstName} {person.lastName}
            </Link>
          </div>
          <div style={{ color: "gray" }}>{person.titles[0]}</div>
        </Column>
        <Column w={5}>
          {person.email !== "" && <EmailLink to={person.email} />}
        </Column>
      </Columns>
    </PersonDiv>
  )
}

export default Person
