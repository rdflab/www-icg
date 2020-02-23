import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import footerLinksStyle from "./footerlinks.module.scss"

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
    <ul className={footerLinksStyle.footerLinks}>
      {links.map(({ node }, index) => {
        return (
          <li>
            <Link key={index} to={node.link}>
              {node.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default FooterLinks
