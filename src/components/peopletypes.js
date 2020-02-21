/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Person from "./person"
import PeopleList from "./peoplelist"
import { PEOPLE_TYPES } from "../constants"
import toPeopleTypeMap from "../utils/peopletypemap"


const PeopleTypes = ({ allPeople, labMap, showLabLink }) => {

  const peopleMap = toPeopleTypeMap(allPeople)

  var elems = []

  var c = 0

  for (let type of PEOPLE_TYPES) {
    const people = peopleMap.get(type)

    if (people.length > 0) {
      elems.push(<h3 key={c++}>{type}</h3>)
      elems.push(<PeopleList key={c++} people={people} labMap={labMap} showLabLink={showLabLink} />)
    }
  }
  
  return(
    <>
    {elems}
    </>
  )
}

export default PeopleTypes
