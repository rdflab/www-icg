import React, { useState } from "react"
import ContactInfo from "./contactinfo"
import Column from "../column"
import FullDiv from "../fulldiv"
import FacultyLink from "../faculty/facultylink"
import PersonLink from "../people/personlink"
import getContextName from "../../utils/contextname"
import ShowSmall from "../showsmall"
import HideSmall from "../hidesmall"
import Card from "../card"
import ZoomImage from "../images/zoomimage"

// const PersonCard = ({ person, smallView }) => (
//   <div
//     className={`w-full trans-ani shadow-lg hover:shadow-xl rounded-md bg-white mb-12 p-8 overflow-hidden`}
//   >
//     <div>
//       <h3>
//         <PersonLink person={person} />
//       </h3>

//       <h4>{person.frontmatter.title}</h4>
//     </div>
//     {!smallView && (
//       <div className="mt-4">
//         <ContactInfo person={person} />
//       </div>
//     )}
//   </div>
// )

// const PersonCard = ({ person, smallView }) => (
//   <div
//     className={`w-full trans-ani border-t-4 border-b-4 border-solid border-gray-400 hover:border-columbia-blue bg-white mb-12 py-4 overflow-hidden`}
//   >
//     <div>
//       <h3>
//         <PersonLink person={person} />
//       </h3>

//       <h4>{person.frontmatter.title}</h4>
//     </div>
//     {!smallView && (
//       <div className="mt-4">
//         <ContactInfo person={person} />
//       </div>
//     )}
//   </div>
// )

// const PersonCard = ({ person, smallView }) => (
//   <div
//     className={`w-full trans-ani border border-solid border-gray-300 hover:shadow rounded-md bg-white mb-12 px-8 py-6 overflow-hidden`}
//   >
//     <div>
//       <h3>
//         <PersonLink person={person} />
//       </h3>

//       <h4>{person.frontmatter.title}</h4>
//     </div>
//     {!smallView && (
//       <div className="mt-4">
//         <ContactInfo person={person} />
//       </div>
//     )}
//   </div>
// )

const PersonCard = ({
  person,
  imageMap,
  smallView,
  context,
  isFaculty,
  showUrl,
  showPhoto,
  showCard,
}) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  let link

  if (isFaculty) {
    link = <FacultyLink person={person} />
  } else {
    if (person.frontmatter.tags.includes("personal-page::true")) {
      link = <PersonLink person={person} />
    } else {
      link = `${person.frontmatter.name}${
        person.frontmatter.postNominalLetters !== ""
          ? `, ${person.frontmatter.postNominalLetters}`
          : ""
      }`
    }
  }

  return (
    <Card
      className="w-full h-full overflow-hidden"
      showCard={showCard}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showPhoto && (
        <div className="overflow-hidden rounded-md">
          <ZoomImage
            fluid={
              person.frontmatter.id in imageMap
                ? imageMap[person.frontmatter.id].childImageSharp.fluid
                : imageMap["generic"].childImageSharp.fluid
            }
            extZoom={hover}
          />
        </div>
      )}
      <div className={`text ${showCard ? "p-4" : "pt-4"}`}>
        <ShowSmall>
          <h4>{link}</h4>
          <h5>{getContextName(context, person.titleMap)}</h5>
        </ShowSmall>
        <HideSmall>
          <div className="font-semibold">{link}</div>
          <div>{getContextName(context, person.titleMap)}</div>
        </HideSmall>
        {!smallView && (
          <div className="mt-2">
            <ContactInfo person={person} showIcons={false} showUrl={showUrl} />
          </div>
        )}
      </div>
    </Card>
  )
}

PersonCard.defaultProps = {
  context: "default",
  showUrl: true,
  showPhoto: true,
  showCard: true,
}

const PeopleGrid = ({
  name,
  imageMap,
  people,
  cols,
  colWidth,
  smallView,
  faculty,
  headingColor,
  showPhoto,
  showHeadings,
  showUrl,
  showCard,
  context,
}) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0
  let index = 0
  let person = null
  let img = null
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
        <Column className={`md:${colWidth} mb-8`} key={index}>
          {person !== null && (
            <PersonCard
              person={person}
              imageMap={imageMap}
              smallView={smallView}
              context={context}
              isFaculty={name === "Faculty"}
              showUrl={showUrl}
              showPhoto={showPhoto}
              showCard={showCard}
            />
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
        <Column className="justify-between items-start items-stretch" key={r}>
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
        {showHeadings && (
          <h5 className={`mb-4 font-semibold ${headingColor}`}>{name}</h5>
        )}

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
  showPhoto: false,
  showHeadings: true,
  showUrl: true,
  showCard: false,
  headingColor: "text",
  context: "default",
}

export default PeopleGrid
