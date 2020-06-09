import React from "react"
import ContactInfo from "./contactinfo"
import Column from "../column"
import FullDiv from "../fulldiv"
import FacultyLink from "../faculty/facultylink"
import genericsvg from "../../assets/svg/generic.svg"
import { useStaticQuery, graphql } from "gatsby"
import useImageMap from "../../hooks/imagemap"
import Img from "gatsby-image"
import DropShadowFrame from "../images/dropshadowframe"
import getContextName from "../../utils/contextname"

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

const PersonCard = ({ person, img, smallView, context, isFaculty }) => {
  let link

  if (isFaculty) {
    link = <FacultyLink person={person} />
  } else {
    link = person.frontmatter.name //<PersonLink person={person} />
  }

  return (
    <div
      className={`w-full trans-ani mb-4 overflow-hidden py-4 text-black border-b-4 border-solid border-transparent  hover:border-columbia-secondary-blue`}
    >
      <div>
        {img !== null && <div className="bg-white mb-6">{img}</div>}
        <h4>{link}</h4>
        <h5>{getContextName(context, person.titleMap)}</h5>
      </div>
      {!smallView && (
        <div className="mt-4 ">
          <ContactInfo person={person} />
        </div>
      )}
    </div>
  )
}

PersonCard.defaultProps = {
  context: "default",
}

const PeopleGrid = ({
  name,
  people,
  cols,
  colWidth,
  smallView,
  faculty,
  headingColor,
  showPhoto,
  showHeadings,
  context,
}) => {
  const data = useStaticQuery(graphql`
    query {
      files: allFile(filter: { absolutePath: { regex: "/images/people/" } }) {
        edges {
          node {
            name
            ext
            relativePath
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const imageMap = useImageMap(data)

  const genericimg = (
    <DropShadowFrame>
      <img src={genericsvg} className="w-full" alt="Photo" />
    </DropShadowFrame>
  )

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
      img = null

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
        if (showPhoto) {
          if (person.frontmatter.id in imageMap) {
            img = (
              <DropShadowFrame>
                <Img
                  fluid={imageMap[person.frontmatter.id].childImageSharp.fluid}
                  className="w-full h-full"
                />
              </DropShadowFrame>
            )
          } else {
            img = genericimg
          }
        }

        found = true
      }

      col.push(
        <Column className={`md:${colWidth}`} key={index}>
          {person !== null && (
            <PersonCard
              person={person}
              img={img}
              smallView={smallView}
              context={context}
              isFaculty={name === "Faculty"}
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
        {showHeadings && <h3 className={`my-4 ${headingColor}`}>{name}</h3>}

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
  headingColor: "text-columbia-secondary-blue",
  context: "default",
}

export default PeopleGrid
