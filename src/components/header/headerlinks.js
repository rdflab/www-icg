import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import HeaderLink from "./headerlink"
import Column from "../column"
import BlueLink from "../bluelink"
import TextLink from "../textlink"

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
    <Column>
      {links.map((link, index) => {
        return (
          <TextLink
            key={index}
            aria-label={`Goto ${link.name}`}
            to={link.link}
            className="mr-8 text-sm font-semibold"
          >
            {link.name}
          </TextLink>
        )
      })}
    </Column>
  )
}

export default HeaderLinks
