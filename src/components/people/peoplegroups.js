import React from "react"
import { GROUPS } from "../../constants"
import PeopleGrid from "./peoplegrid"

const PeopleGroups = ({ groupMap, faculty }) => {
  const ret = []

  for (let g of GROUPS) {
    if (g in groupMap) {
      const people = groupMap[g]

      ret.push(
        // <Column className="mb-4 shadow">
        //   <Column className="w-2/10">
        //     <div className="text-white p-4 bg-gray-500 w-full h-full">
        //       <h3>{division.name}</h3>
        //     </div>
        //   </Column>
        //   <Column className="w-8/10 bg-white">
        //     <PeopleGrid
        //       people={division.people}
        //       peopleMap={peopleMap}
        //       cols={3}
        //     />
        //   </Column>
        // </Column>

        <div className="mb-4">
          <PeopleGrid name={g} people={people} faculty={faculty} cols={3} />
        </div>
      )
    }
  }

  return ret
}

PeopleGroups.defaultProps = {
  faculty: null,
}

export default PeopleGroups
