import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import HeaderLink from "./headerlink"

const HeaderLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      links: allHeaderlinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const links = flattenEdges(data.links.edges)

  return (
    <>
      {links.map((link, index) => {
        return (
          <HeaderLink
            key={index}
            aria-label={`Goto ${link.name}`}
            to={link.link}
          >
            {link.name}
          </HeaderLink>
        )
      })}
    </>
  )
}

export default HeaderLinks
