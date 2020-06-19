import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import WhiteLink from "../links/whitelink"
import WhiteLinkExt from "../links/whitelinkext"

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
      <div className="mb-2 font-semibold" key={index}>
        <WhiteLink aria-label={`Goto ${node.name}`} to={node.link}>
          {node.name}
        </WhiteLink>
      </div>
    )
  })

  ret.push(
    <div className="mb-2 font-semibold" key="booking">
      <WhiteLinkExt
        aria-label={`Goto Booking Site`}
        to="https://booking.columbiaicg.org"
      >
        Book Instruments
      </WhiteLinkExt>
    </div>
  )

  // return (
  //   <div className="links-list">
  //     {ret}
  //   </div>
  // )

  return <div>{ret}</div>
}

export default FooterLinks
