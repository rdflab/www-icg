import React from "react"
import SideBarLink from "../sidebar/sidebarlink"
import Collapsible from "../collapsible"
import VT2 from "../vt2"

const SideBarMembers = ({ lab, people }) => (
  <VT2>
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
  </VT2>
)

export default SideBarMembers
