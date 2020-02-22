import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../utils/flattenedges"
import HeaderLink from "./headerlink"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const HeaderLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      allHeaderlinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const links = flattenEdges(data.allHeaderlinksJson.edges)

  return (
    <>
      {links.map((link, index) => {
        return (
          <HeaderLink key={index} to={link.link}>
            {link.name}
          </HeaderLink>
        )
      })}
    </>
  )
}

export default HeaderLinks
