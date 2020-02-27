/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import H4 from "../headings/h4"
import styled from "styled-components"
import Card from "../../components/card"
import Button from "../../components/button"
import VS2 from "../vs2"

const RuledDiv = styled.div`
  border-top: solid 4px lightgray;
  padding-top 2rem;
`

const RecentPublications = ({ lab, publications, labMap, peopleMap, top }) => {
  const createPublications = publications => {
    let ret = []

    // Outer loop to create parent
    for (let i = 0; i < Math.min(top, publications.length); ++i) {
      ret.push(
        <Publication
          key={i}
          publication={publications[i]}
          labMap={labMap}
          peopleMap={peopleMap}
        />
      )
    }

    return ret
  }

  return (
    <VS2>
      <Card>
        <H4>Recent Publications</H4>
        {createPublications(publications)}
        <div className="has-text-centered">
          <Button to={`/research-areas/labs/${lab.id}/publications`}>
            More
          </Button>
        </div>
      </Card>
    </VS2>
  )
}

RecentPublications.defaultProps = {
  top: 5,
}

export default RecentPublications
