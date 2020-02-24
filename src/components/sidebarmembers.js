import React from "react"
import SideBarLink from "./sidebarlink"
import Collapsible from "./collapsible"

const SideBarMembers = ({ lab, people }) => (
  <Collapsible title="Lab Members" height="auto">
    {/* <div className="bottom-spacing-1">
      <SideBarLink
        to={`/research-areas/labs/${lab.id}/members`}
        style={{ marginBottom: "1rem" }}
      >
        Overview
      </SideBarLink>
    </div> */}

    {people.map((person, index) => (
      <div style={{ marginBottom: "1rem" }}>
        <div>
          <SideBarLink to={`/research-areas/faculty-and-staff/${person.id}`}>
            {person.firstName} {person.lastName}
          </SideBarLink>
        </div>
        <div style={{ fontWeight: 300 }}>{person.titles[0]}</div>
      </div>
    ))}
  </Collapsible>
)

export default SideBarMembers
