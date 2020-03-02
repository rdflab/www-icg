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
    <div className="mt-2">
      {links.map((link, index) => {
        return <HeaderLink to={link.link}>{link.name}</HeaderLink>
      })}
    </div>
  )
}

export default HeaderLinks
