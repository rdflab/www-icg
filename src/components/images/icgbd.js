import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "icg.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage className={className} fluid={imageData}>
          {children}
        </BackgroundImage>
      )
    }}
  />
)

const ICGBD = styled(BackgroundSection)`
  width: 100%;
  height: 24rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`

export default ICGBD
