import React from "react"
import { personName } from "../../utils/personname"
import ContactInfo from "./contactinfo"
import H from "../headings/h"

const PersonHeader = ({ person, title, heading, subHeading }) => {
  if (heading === null) {
    heading = personName(person)
  }

  if (subHeading === null) {
    subHeading = person.frontmatter.title
  }

  return (
    <H
      title={title}
      heading={heading}
      subHeading={subHeading}
      content={<ContactInfo person={person} color="white" />}
    />
  )
}

PersonHeader.defaultProps = {
  title: "People",
  heading: null,
  subHeading: null,
}

export default PersonHeader
