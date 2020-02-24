import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import flattenEdges from "../utils/flattenedges"
import HeaderLink from "./headerlink"

const HeaderLinks = ({ selected }) => {
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
    <div
      className={`navbar-start`}
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      {links.map((link, index) => {
        return (
          <HeaderLink key={index} to={link.link}>
            {link.name}
          </HeaderLink>
        )
      })}
    </div>
  )
}

HeaderLinks.defaultProps = {
  selected: "",
}

export default HeaderLinks
