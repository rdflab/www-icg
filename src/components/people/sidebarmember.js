import React from "react"
import SideBarLink from "../sidebar/sidebarlink"
import { personUrl } from "../../utils/urls"
import { personName } from "../../utils/personname"

const SideBarMember = ({ person }) => (
  <div className="mb-4">
    <div>
      <SideBarLink to={personUrl(person)}>{personName(person)}</SideBarLink>
    </div>
    <div className="font-light">{person.frontmatter.titles[0]}</div>
  </div>
)

export default SideBarMember
