import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../utils/flattenedges"
import HeaderLink from "./headerlink"

const HeaderLinks = ({ selected }) => {
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
    <div
      className={`navbar-start`}
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      {links.map((link, index) => {
        return (
          <div key={index} class="navbar-item is-marginless is-paddingless">
            <HeaderLink to={link.link}>{link.name}</HeaderLink>
          </div>
        )
      })}
    </div>
  )
}

HeaderLinks.defaultProps = {
  selected: "",
}

export default HeaderLinks
