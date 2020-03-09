import React from "react"
import EmailLink from "../emaillink"
import MembersLink from "../memberslink"
import PublicationsLink from "../publication/publicationslink"
import Columns from "../columns"
import Column from "../column"
//import SideBar from "./sidebar/sidebar"
import TextLink from "../textlink"

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
        <div
          className="pt-4 pb-8 border-t border-solid border-gray-300"
          key={index}
        >
          <Columns>
            <Column w="1/2">
              <h3>
                <TextLink to={`/research-areas/labs/${group.frontmatter.id}`}>
                  {name}
                </TextLink>
              </h3>
            </Column>
            <Column w="1/2" style={{ borderLeft: "solid 1px lightgray" }}>
              <MembersLink
                to={`/research-areas/labs/${group.frontmatter.id}/members`}
              />
              <PublicationsLink
                to={`/research-areas/labs/${group.frontmatter.id}/publications`}
              />
              <EmailLink to={person.frontmatter.email[0]} />
            </Column>
          </Columns>
        </div>
      )
    })}
  </>
)

export default Labs
