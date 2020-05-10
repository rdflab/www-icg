import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Leica = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/leica.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.file.childImageSharp.fluid} className="w-full" />
}

export default Leica
