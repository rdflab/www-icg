import React from "react"
import { GROUPS } from "../../constants"
import PeopleGrid from "./peoplegrid"
import Card from "../card"

const PeopleGroups = ({
  groupMap,
  imageMap,
  cols,
  colWidth,
  smallView,
  showHeadings,
  faculty,
  headingColor,
  showPhoto,
  showUrl,
  showCard,
  context,
}) => {
  const ret = []

  for (let g of GROUPS) {
    if (g in groupMap) {
      const people = groupMap[g]

      if (people.length > 0) {
        ret.push(
          <div className="mb-8" key={g}>
            <PeopleGrid
              name={g}
              imageMap={imageMap}
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
              showCard={showCard}
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
  showCard: false,
  cols: 5,
  colWidth: "w-19/100",
  headingColor: "text-gray-700",
  context: "default",
}

export default PeopleGroups
