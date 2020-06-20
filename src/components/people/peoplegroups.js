import React from "react"
import { GROUPS } from "../../constants"
import PeopleGrid from "./peoplegrid"

const PeopleGroups = ({
  groupMap,
  cols,
  colWidth,
  smallView,
  showHeadings,
  faculty,
  headingColor,
  showPhoto,
  showUrl,
  context,
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
              showPhoto={showPhoto}
              context={g}
              showHeadings={showHeadings}
              showUrl={showUrl}
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
  showPhoto: false,
  smallView: false,
  showHeadings: true,
  showUrl: true,
  cols: 5,
  colWidth: "w-19/100",
  headingColor: "text-columbia-blue",
  context: "default",
}

export default PeopleGroups
