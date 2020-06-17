import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import HeaderLink from "./headerlink"
import Column from "../column"

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

  const ret = []

  for (let i = 0; i < links.length; ++i) {
    const link = links[i]
    ret.push(
      <HeaderLink key={i} aria-label={`Goto ${link.name}`} to={link.link}>
        {link.name}
      </HeaderLink>
    )

    if (i < links.length - 1) {
      ret.push(<div className="mx-2" />)
    }
  }

  return (
    <div className="w-full sm:w-8/10 lg:w-6/10 xl:w-4/10">
      <Column className="justify-between">{ret}</Column>
    </div>
  )
}

export default HeaderLinks
