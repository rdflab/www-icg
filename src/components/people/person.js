/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Columns from "../columns"
import MainColumn from "../maincolumn"
import ContactInfo from "./contactinfo"
import Column from "../column"
import TextLink from "../textlink"
import Img from "gatsby-image"

const Person = ({ person, groupMap, showLabLink, image }) => {
  return (
    <div className="my-4">
      <Columns>
        <Column w="1/12" className="mr-4 text-center">
          {image !== null && (
            <Img
              fluid={image.childImageSharp.fluid}
              className="w-full shadow rounded"
            />
          )}
        </Column>
        <MainColumn w="5/12">
          <div>
            <h3>
              <TextLink
                to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
              >
                {person.frontmatter.firstName} {person.frontmatter.lastName}
              </TextLink>
            </h3>
          </div>
          <div className="gray">{person.frontmatter.titles[0]}</div>
        </MainColumn>
        <Column w="5/12">
          <ContactInfo person={person} />
        </Column>
      </Columns>
    </div>
  )
}

Person.defaultProps = {
  image: null,
}

export default Person
