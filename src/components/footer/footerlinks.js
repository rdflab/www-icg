import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import footerLinksStyle from "./footerlinks.module.scss"
import FooterLink from "./footerlink"

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
            <FooterLink key={index} to={node.link}>
              {node.name}
            </FooterLink>
          </li>
        )
      })}
    </ul>
  )
}

export default FooterLinks
