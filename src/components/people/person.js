/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Column from "../column"
import ContactInfo from "./contactinfo"
import Img from "gatsby-image"
import BlueLink from "../bluelink"
import { personUrl } from "../../utils/urls"
import { personName } from "../../utils/personname"

const Person = ({ person, showLabLink, image, generic }) => {
  let im

  if (image !== null) {
    im = (
      <Img
        fluid={image.childImageSharp.fluid}
        className="w-full shadow rounded"
      />
    )
  } else {
    im = (
      <Img
        fluid={generic.childImageSharp.fluid}
        className="w-full shadow rounded"
      />
    )
  }

  return (
    <div className="w-full mb-6">
      <Column>
        <Column w={2} className="mr-8">
          {im !== null && im}
        </Column>
        <Column w={10}>
          <div className="w-full">
            <h2>
              <BlueLink to={personUrl(person)}>{personName(person)}</BlueLink>
            </h2>

            <h2 className="gray mb-2">{person.frontmatter.title}</h2>

            <ContactInfo person={person} />
          </div>

          {/* <Column>
            <Column w={6}>
              <div>
                <h3>
                  <BlueLink to={personUrl(person)}>
                    {personName(person)}
                  </BlueLink>
                </h3>

                <div className="gray mb-4">{person.frontmatter.titles[0]}</div>
              </div>
            </Column>
            <Column w={6}>
            <FlatCard>
              <ContactInfo person={person} />
              </FlatCard>
            </Column>
          </Column> */}
        </Column>
      </Column>
    </div>
  )
}

Person.defaultProps = {
  image: null,
  generic: null,
}

export default Person
