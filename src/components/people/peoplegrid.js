import React from "react"
import ContactInfo from "./contactinfo"
import PersonLink from "./personlink"
import Column from "../column"
import H2 from "../headings/h2"
import FullDiv from "../fulldiv"

const PeopleGrid = ({ name, people, cols, colWidth, smallView, faculty }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = null

      if (pc < people.length) {
        person = people[pc++]

        if (
          faculty !== null &&
          faculty.frontmatter.id === person.frontmatter.id
        ) {
          person = people[pc++]
        }
      }

      col.push(
        <Column className={`md:${colWidth}`}>
          {person != null && (
            <div className={`w-full py-4 trans-ani`}>
              <div>
                <PersonLink person={person} />
              </div>
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

      // if (pc === people.length) {
      //   break
      // }
    }

    if (col.length > 0) {
      ret.push(<Column className="justify-between">{col}</Column>)
    }

    if (pc === people.length) {
      break
    }
  }

  if (ret.length > 0) {
    return (
      <FullDiv>
        <div>
          <h2>{name}</h2>
        </div>
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
