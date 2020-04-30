import React from "react"
import ContactInfo from "./contactinfo"
import PersonLink from "./personlink"
import Column from "../column"
import { nominalTypeHack } from "prop-types"
import H2 from "../headings/h2"

const PeopleGrid = ({ name, people, peopleMap, cols, faculty }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []
    let c = 0

    while (c < cols) {
      let person = peopleMap[people[pc]]

      if (
        faculty === null ||
        faculty.frontmatter.id !== person.frontmatter.id
      ) {
        col.push(
          <Column className={`w-1/${cols}`}>
            {pc < people.length && (
              <div
                className={`w-full p-4 rounded overflow-hidden hover:shadow-md trans-ani`}
              >
                <div>
                  <div>
                    <PersonLink person={person} />
                  </div>
                  <div>{person.frontmatter.title}</div>
                  <div>
                    <ContactInfo person={person} />
                  </div>
                </div>
              </div>
            )}
          </Column>
        )
        ++c
      }

      ++pc

      if (pc === people.length) {
        break
      }
    }

    if (col.length > 0) {
      ret.push(<Column>{col}</Column>)
    }

    if (pc === people.length) {
      break
    }
  }

  if (ret.length > 0) {
    return (
      <div className="w-full">
        <div>
          <H2 className="mb-4">{name}</H2>
        </div>
        <div>{ret}</div>
      </div>
    )
  } else {
    return null
  }
}

PeopleGrid.defaultProps = {
  cols: 4,
  faculty: null,
}

export default PeopleGrid
