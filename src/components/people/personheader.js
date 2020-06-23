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
      content={
        <div>
          <div className="uppercase mb-2">Contact</div>
          <ContactInfo person={person} color="white" />
        </div>
      }
      showShareLinks={false}
      className="shadow-md"
    />
  )
}

PersonHeader.defaultProps = {
  title: "",
  heading: null,
  subHeading: null,
}

export default PersonHeader
