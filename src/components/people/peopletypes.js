/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PeopleList from "./peoplelist"
import { PEOPLE_TYPES } from "../../constants"
import toPeopleGroupMap from "../../utils/peoplegroupmap"
import SectionBreak from "../sectionbreak"
import PeopleGrid from "./peoplegrid"

const PeopleTypes = ({ allPeople, peopleMap, showLabLink, imageMap }) => {
  const peopleTypeMap = toPeopleGroupMap(allPeople)

  var elems = []

  var c = 0

  for (let type of PEOPLE_TYPES) {
    const people = peopleTypeMap[type]

    if (people.length > 0) {
      elems.push(
        <PeopleGrid
          name={type}
          people={people}
          peopleMap={peopleMap}
          cols={3}
        />
      )
    }
  }

  return <>{elems}</>
}

PeopleTypes.defaultProps = {
  showLabLink: true,
  imageMap: {},
}

export default PeopleTypes
