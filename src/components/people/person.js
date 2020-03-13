/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Column from "../column"
import MainColumn from "../maincolumn"
import ContactInfo from "./contactinfo"
import Img from "gatsby-image"
import FlatCard from "../flatcard"
import BlueLink from "../bluelink"
import { personUrl } from "../../utils/urls"
import { personName } from "../../utils/personname"

const Person = ({ person, showLabLink, image }) => {
  return (
    <div className="my-4">
      <Column isCentered={true}>
        <Column w="1" className="mr-4">
          {image !== null && (
            <Img
              fluid={image.childImageSharp.fluid}
              className="w-full shadow rounded"
            />
          )}
        </Column>
        <MainColumn w="4">
          <div>
            <h3 className="mt-2">
              <BlueLink to={personUrl(person)}>{personName(person)}</BlueLink>
            </h3>

            <div className="gray">{person.frontmatter.titles[0]}</div>
          </div>
        </MainColumn>
        <Column w="4">
          <FlatCard>
            <ContactInfo person={person} />
          </FlatCard>
        </Column>
      </Column>
    </div>
  )
}

Person.defaultProps = {
  image: null,
}

export default Person
