import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

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
    <>
      {links.map(({ node }, index) => {
        return (
          <Link key={index} to={node.link}>
            {node.name}
          </Link>
        )
      })}
    </>
  )
}

export default FooterLinks
