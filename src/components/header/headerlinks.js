import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import HeaderLink from "./headerlink"
import Column from "../column"
import BlueLink from "../bluelink"
import TextLink from "../textlink"
import Header from "./header"

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
    <div className="w-1/2">
      <Column className="justify-between">
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
      </Column>
    </div>
  )
}

export default HeaderLinks
