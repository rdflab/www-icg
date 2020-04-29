import React from "react"
import ContactInfo from "./contactinfo"
import PersonLink from "./personlink"
import Column from "../column"

const PeopleGrid = ({ people, peopleMap, cols }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = peopleMap[people[pc]]

      col.push(
        <Column className={`w-1/${cols}`}>
          {pc < people.length && (
            <div className={`w-full p-4`}>
              <div>
                <div>
                  <PersonLink person={person} />
                </div>
                <ContactInfo person={person} />
              </div>
            </div>
          )}
        </Column>
      )

      ++pc

      if (pc === people.length) {
        break
      }
    }

    ret.push(<Column className="w-full">{col}</Column>)

    if (pc === people.length) {
      break
    }
  }

  return <div className="w-full">{ret}</div>
}

PeopleGrid.defaultProps = {
  cols: 4,
}

export default PeopleGrid
