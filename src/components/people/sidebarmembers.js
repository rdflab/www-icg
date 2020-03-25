import React from "react"
import Collapsible from "../collapsible"
import SideBarMember from "./sidebarmember"

const SideBarMembers = ({ people, title, maxRecords }) => {
  const ret = []

  for (let i = 0; i < people.length; ++i) {
    const person = people[i]

    ret.push(<SideBarMember person={person} />)

    if (i === maxRecords) {
      break
    }
  }

  return (
    <Collapsible title={title} height="auto">
      {/* <div className="bottom-spacing-1">
      <SideBarLink
        to={`/research-areas/labs/${group.frontmatter.id}/members`}
        style={{ marginBottom: "1rem" }}
      >
        Overview
      </SideBarLink>
    </div> */}

      {ret}
    </Collapsible>
  )
}

SideBarMembers.defaultProps = {
  title: "Lab Members",
  maxRecords: -1,
}

export default SideBarMembers
