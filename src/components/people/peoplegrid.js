import React from "react"
import ContactInfo from "./contactinfo"
import PersonLink from "./personlink"
import Column from "../column"
import FullDiv from "../fulldiv"

const PeopleGrid = ({ name, people, cols, colWidth, smallView, faculty }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0
  let index = 0
  let person = null
  let found = false

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      person = null

      if (pc < people.length) {
        person = people[pc++]

        if (
          faculty !== null &&
          faculty.frontmatter.id === person.frontmatter.id
        ) {
          // Skip to next person
          person = people[pc++]
        }
      }

      if (person !== null && person !== undefined) {
        found = true
      }

      col.push(
        <Column className={`md:${colWidth}`} key={index}>
          {person != null && (
            <div className={`w-full py-4 trans-ani`}>
              <h3>
                <PersonLink person={person} />
              </h3>
              <div>{person.frontmatter.title}</div>

              {!smallView && (
                <div>
                  <ContactInfo person={person} />
                </div>
              )}
            </div>
          )}
        </Column>
      )

      ++index

      // if (pc === people.length) {
      //   break
      // }
    }

    if (col.length > 0) {
      ret.push(
        <Column className="justify-between" key={r}>
          {col}
        </Column>
      )
    }

    if (pc === people.length) {
      break
    }
  }

  if (found) {
    return (
      <FullDiv key={name}>
        <h2>{name}</h2>
        <div>{ret}</div>
      </FullDiv>
    )
  } else {
    return null
  }
}

PeopleGrid.defaultProps = {
  cols: 4,
  colWidth: "w-2/10",
  smallView: false,
  faculty: null,
}

export default PeopleGrid
