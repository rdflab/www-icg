import React from "react"
import EmailLink from "../emaillink"
import MembersLink from "../memberslink"
import PublicationsLink from "../publication/publicationslink"
import Column from "../column"

import BlueLink from "../bluelink"
import FlatCard from "../flatcard"
import { labMembersUrl, labUrl } from "../../utils/urls"

const Labs = ({ groups, peopleMap }) => (
  <>
    {groups.map((group, index) => {
      const person = peopleMap[group.frontmatter.leaders[0]]

      let name =
        person.frontmatter.firstName + " " + person.frontmatter.lastName

      if (person.frontmatter.letters.length > 0) {
        name += ", " + person.frontmatter.letters.join(" ")
      }

      return (
        // <SectionBreak key={index}>
        <Column key={index} isCentered={true} className="mb-8">
          <Column w={6}>
            <h2 className="my-2">
              <BlueLink to={labUrl(group)}>{name}</BlueLink>
            </h2>
          </Column>
          <Column w={6}>
            <FlatCard>
              <MembersLink to={labMembersUrl(group)} />
              <PublicationsLink
                to={`/research-areas/labs/${group.frontmatter.id}/publications`}
              />
              <EmailLink to={person.frontmatter.email[0]} />
            </FlatCard>
          </Column>
        </Column>
        // </SectionBreak>
      )
    })}
  </>
)

export default Labs
