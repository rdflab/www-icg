import React from "react"
import SideBarLink from "../sidebar/sidebarlink"
import Collapsible from "../collapsible"

const SideBarMembers = ({ group, people }) => (
  <Collapsible title="Lab Members" height="auto">
    {/* <div className="bottom-spacing-1">
      <SideBarLink
        to={`/research-areas/labs/${group.frontmatter.id}/members`}
        style={{ marginBottom: "1rem" }}
      >
        Overview
      </SideBarLink>
    </div> */}

    {people.map((person, index) => (
      <div key={index} style={{ marginBottom: "1rem" }}>
        <div>
          <SideBarLink
            to={`/research-areas/faculty-and-staff/${person.frontmatter.id}`}
          >
            {person.frontmatter.firstName} {person.frontmatter.lastName}
          </SideBarLink>
        </div>
        <div style={{ fontWeight: 300 }}>{person.frontmatter.titles[0]}</div>
      </div>
    ))}
  </Collapsible>
)

export default SideBarMembers
