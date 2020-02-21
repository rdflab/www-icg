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

const TYPES = ["Faculty", "Scientist", "Staff"]

const toPeopleMap = people => {
  const ret = new Map()

  for (let type of TYPES) {
    ret.set(type, [])
  }

  for (let person of people) {
    let type = "Staff"

    for (let tag of person.tags) {
      if (tag.includes("faculty")) {
        type = "Faculty"
      }
    }

    for (let title of person.titles) {
      if (title.includes("Associate")) {
        type = "Scientist"
      }

      if (title.includes("Postdoc")) {
        type = "Scientist"
      }

      if (title.includes("Professor")) {
        type = "Faculty"
      }
    }

    console.log(people, type)

    

    ret.get(type).push(person)
  }

  return ret
}

const PeopleTypes = ({ allPeople, labMap, showLabLink }) => {

  const peopleMap = toPeopleMap(allPeople)

  var elems = []

  for (let type of TYPES) {
    const people = peopleMap.get(type)

    if (people.length > 0) {
      elems.push(<h3>{type}</h3>)
      elems.push(<PeopleList people={people} labMap={labMap} showLabLink={showLabLink} />)
    }
  }
  
  return(
    <>
    {elems}
    </>
  )
}

export default PeopleTypes
