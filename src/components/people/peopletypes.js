/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PeopleList from "./peoplelist"
import { PEOPLE_TYPES } from "../../constants"
import toPeopleTypeMap from "../../utils/peopletypemap"
import styled from "styled-components"

const StyledDiv = styled.div`
  margin-top: 1rem;
  border-bottom: solid 1px lightgray;
`

const PeopleTypes = ({ allPeople, groupMap, showLabLink }) => {
  const peopleMap = toPeopleTypeMap(allPeople)

  var elems = []

  var c = 0

  for (let type of PEOPLE_TYPES) {
    const people = peopleMap[type]

    if (people.length > 0) {
      elems.push(
        <StyledDiv key={c++}>
          <h2>{type}</h2>
        </StyledDiv>
      )
      elems.push(
        <PeopleList
          key={c++}
          people={people}
          groupMap={groupMap}
          showLabLink={showLabLink}
        />
      )
    }
  }

  return <>{elems}</>
}

export default PeopleTypes
