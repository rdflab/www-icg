import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import WhiteLink from "../whitelink"

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LinkItem = styled.li`
  display: inline;
  padding: 0;
  margin: 0;

  &:not(:last-child)::after {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: solid 1px white;
    content: "";
`

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
    <LinksList>
      {links.map(({ node }, index) => {
        return (
          <LinkItem key={index}>
            <WhiteLink to={node.link}>{node.name}</WhiteLink>
          </LinkItem>
        )
      })}
    </LinksList>
  )
}

export default FooterLinks
