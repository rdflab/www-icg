import React from "react"
import { GROUPS } from "../../constants"
import PeopleGrid from "./peoplegrid"

const PeopleGroups = ({ groupMap, cols, colWidth, smallView, faculty }) => {
  const ret = []

  for (let g of GROUPS) {
    if (g in groupMap) {
      const people = groupMap[g]

      ret.push(
        <div className="mb-4">
          <PeopleGrid
            name={g}
            people={people}
            faculty={faculty}
            cols={cols}
            colWidth={colWidth}
            smallView={smallView}
          />
        </div>
      )
    }
  }

  return ret
}

PeopleGroups.defaultProps = {
  faculty: null,
  smallView: false,
  cols: 4,
  colWidth: "w-2/10",
}

export default PeopleGroups
