import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "benchwork.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={(data) => {
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

const Benchwork = styled(BackgroundSection)`
  width: 100%;
  background-position: center center;
  background-repeat: no-repear;
  background-size: cover;
  overflow: hidden;
`

export default Benchwork
