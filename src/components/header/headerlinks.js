import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import HeaderLink from "./headerlink"
import styled from "styled-components"

const StyledDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

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
    <StyledDiv className="navbar-start">
      {links.map((link, index) => {
        return (
          <div key={index} className="navbar-item is-marginless is-paddingless">
            <HeaderLink to={link.link}>{link.name}</HeaderLink>
          </div>
        )
      })}
    </StyledDiv>
  )
}

export default HeaderLinks
