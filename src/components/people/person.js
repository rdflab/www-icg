/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Columns from "../columns"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import styled from "styled-components"
import BlueLink from "../bluelink"
import ContactInfo from "./contactinfo"
import Column from "../column"

const PersonDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <PersonDiv>
      <Columns>
        <MainColumn w="7/12" className="mb-4">
          <div>
            <h3>
              <BlueLink
                to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
              >
                {person.frontmatter.firstName} {person.frontmatter.lastName}
              </BlueLink>
            </h3>
          </div>
          <div className="gray">{person.frontmatter.titles[0]}</div>
        </MainColumn>
        <Column w="5/12">
          <ContactInfo person={person} />
        </Column>
      </Columns>
    </PersonDiv>
  )
}

export default Person
