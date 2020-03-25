import React from "react"
import SideBarLink from "../sidebar/sidebarlink"
import BlueLink from "../bluelink"
import { personUrl } from "../../utils/urls"
import { personName } from "../../utils/personname"

const SideBarMember = ({ person }) => (
  <div className="mb-4">
    <div>
      <BlueLink to={personUrl(person)}>{personName(person)}</BlueLink>
    </div>
    <div className="gray">{person.frontmatter.titles[0]}</div>
  </div>
)

export default SideBarMember
