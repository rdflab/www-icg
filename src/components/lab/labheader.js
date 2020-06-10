import React from "react"
import WhiteLinkExt from "../links/whitelinkext"
import H from "../headings/h"

const LabWebSite = ({ person }) => {
  if (person.frontmatter.url !== "") {
    const tokens = person.frontmatter.url.split("::")

    let text
    let to

    if (tokens.length > 1) {
      text = tokens[0]
      to = tokens[1]
    } else {
      text = tokens[0]
      to = tokens[0]
    }

    return (
      <div>
        <h5>
          <WhiteLinkExt to={to}>Lab Web Site</WhiteLinkExt>
        </h5>
      </div>
    )
  } else {
    return <></>
  }
}

const LabHeader = ({ person, title, heading, subHeading, path }) => {
  if (heading === null) {
    heading = person.frontmatter.name
  }

  return (
    <H
      title={title}
      heading={heading}
      subHeading={subHeading}
      content={<LabWebSite person={person} />}
      path={path}
    />
  )
}

LabHeader.defaultProps = {
  title: "Labs",
  heading: null,
  subHeading: null,
  path: "",
}

export default LabHeader
