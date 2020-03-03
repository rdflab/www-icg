import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import WhiteLink from "../whitelink"

const FooterLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      allFooterlinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const links = data.allFooterlinksJson.edges

  return (
    <div className="links-list">
      {links.map(({ node }, index) => {
        return (
          <div className="link-item" key={index}>
            <WhiteLink to={node.link}>{node.name}</WhiteLink>
          </div>
        )
      })}
    </div>
  )
}

export default FooterLinks
