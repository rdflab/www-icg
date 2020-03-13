import React from "react"
import SideBarLink from "../sidebar/sidebarlink"
import Collapsible from "../collapsible"
import { personUrl } from "../../utils/urls"
import { personName } from "../../utils/personname"

const SideBarMembers = ({ people, maxRecords }) => {
  const ret = []

  for (let i = 0; i < people.length; ++i) {
    const person = people[i]

    ret.push(
      <div key={i} className="mb-4">
        <div>
          <SideBarLink to={personUrl(person)}>{personName(person)}</SideBarLink>
        </div>
        <div className="font-light">{person.frontmatter.titles[0]}</div>
      </div>
    )

    if (i == maxRecords) {
      break
    }
  }

  return (
    <Collapsible title="Lab Members" height="auto">
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
  maxRecords: -1,
}

export default SideBarMembers
