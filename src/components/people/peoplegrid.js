import React from "react"
import ContactInfo from "./contactinfo"
import PersonLink from "./personlink"
import Column from "../column"
import FullDiv from "../fulldiv"

const PersonCard = ({ person, smallView }) => (
  <div
    className={`w-full trans-ani shadow-lg hover:shadow-xl rounded-md bg-white mb-12 p-8 overflow-hidden`}
  >
    <div>
      <h3>
        <PersonLink person={person} />
      </h3>

      <h4>{person.frontmatter.title}</h4>
    </div>
    {!smallView && (
      <div className="mt-4">
        <ContactInfo person={person} />
      </div>
    )}
  </div>
)

const PeopleGrid = ({
  name,
  people,
  cols,
  colWidth,
  smallView,
  faculty,
  headingColor,
}) => {
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
          {person !== null && (
            <PersonCard person={person} smallView={smallView} />
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
        <h2 className={`py-4 ${headingColor}`}>{name}</h2>
        <div>{ret}</div>
      </FullDiv>
    )
  } else {
    return null
  }
}

PeopleGrid.defaultProps = {
  cols: 3,
  colWidth: "w-3/10",
  smallView: false,
  faculty: null,
  headingColor: "text-black",
}

export default PeopleGrid
