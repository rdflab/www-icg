import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import WhiteLink from "../whitelink"
import WhiteLinkExt from "../whitelinkext"

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

  const ret = links.map(({ node }, index) => {
    return (
      <div className="mb-2" key={index}>
        <WhiteLink aria-label={`Goto ${node.name}`} to={node.link}>
          {node.name}
        </WhiteLink>
      </div>
    )
  })

  // return (
  //   <div className="links-list">
  //     {ret}
  //   </div>
  // )

  return <div>{ret}</div>
}

export default FooterLinks
