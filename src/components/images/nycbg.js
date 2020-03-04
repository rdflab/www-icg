import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "nyc_bg.jpg" }) {
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
        <BackgroundImage
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
)

const NYCBgSection = styled(BackgroundSection)`
  width: 100%;
  height: 32rem;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
  overflow: hidden;
`

export default NYCBgSection
