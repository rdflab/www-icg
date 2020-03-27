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
import SectionBreak from "../sectionbreak"

const PeopleTypes = ({ allPeople, showLabLink, imageMap }) => {
  const peopleMap = toPeopleTypeMap(allPeople)

  var elems = []

  var c = 0

  for (let type of PEOPLE_TYPES) {
    const people = peopleMap[type]

    if (people.length > 0) {
      elems.push(
        <SectionBreak title={type} key={c++}>
          <PeopleList
            key={c++}
            imageMap={imageMap}
            people={people}
            showLabLink={showLabLink}
          />
        </SectionBreak>
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
