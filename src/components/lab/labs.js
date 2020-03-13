import React from "react"
import EmailLink from "../emaillink"
import MembersLink from "../memberslink"
import PublicationsLink from "../publication/publicationslink"
import Columns from "../columns"
import Column from "../column"
//import SideBar from "./sidebar/sidebar"
import TextLink from "../textlink"
import SectionBreak from "../sectionbreak"
import Card from "../card"
import BlueLink from "../bluelink"
import FlatCard from "../flatcard"

const Labs = ({ pagedGroups, peopleMap }) => (
  <>
    {pagedGroups.map((group, index) => {
      const person = peopleMap[group.frontmatter.leaders[0]]

      let name =
        person.frontmatter.firstName + " " + person.frontmatter.lastName

      if (person.frontmatter.letters.length > 0) {
        name += ", " + person.frontmatter.letters.join(" ")
      }

      return (
        <SectionBreak key={index}>
          <Columns>
            <Column w="4/12">
              <h2 className="my-2">
                <BlueLink to={`/research-areas/labs/${group.frontmatter.id}`}>
                  {name}
                </BlueLink>
              </h2>
            </Column>
            <Column w="4/12">
              <Card>
                <MembersLink
                  to={`/research-areas/labs/${group.frontmatter.id}/members`}
                />
                <PublicationsLink
                  to={`/research-areas/labs/${group.frontmatter.id}/publications`}
                />
                <EmailLink to={person.frontmatter.email[0]} />
              </Card>
            </Column>
          </Columns>
        </SectionBreak>
      )
    })}
  </>
)

export default Labs
