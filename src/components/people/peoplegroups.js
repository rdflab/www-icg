import React from "react"
import { GROUPS } from "../../constants"
import PeopleGrid from "./peoplegrid"

const PeopleGroups = ({
  groupMap,
  cols,
  colWidth,
  smallView,
  faculty,
  headingColor,
}) => {
  const ret = []

  for (let g of GROUPS) {
    if (g in groupMap) {
      const people = groupMap[g]

      if (people.length > 0) {
        ret.push(
          <div className="mb-4" key={g}>
            <PeopleGrid
              name={g}
              people={people}
              faculty={faculty}
              cols={cols}
              colWidth={colWidth}
              smallView={smallView}
              headingColor={headingColor}
            />
          </div>
        )
      }
    }
  }

  return ret
}

PeopleGroups.defaultProps = {
  faculty: null,
  smallView: false,
  cols: 3,
  colWidth: "w-3/10",
  headingColor: "text-black", //"text-columbia-secondary-blue",
}

export default PeopleGroups
