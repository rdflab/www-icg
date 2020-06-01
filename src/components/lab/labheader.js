import React from "react"
import WhiteLinkExt from "../whitelinkext"
import H from "../headings/h"

const LabWebSite = ({ lab }) => {
  if (lab.url !== "") {
    return (
      <div>
        <h5>
          <WhiteLinkExt to={lab.url[1]}>{lab.url[0]}</WhiteLinkExt>
        </h5>
      </div>
    )
  } else {
    return <></>
  }
}

const LabHeader = ({ lab, title, heading, subHeading }) => {
  if (heading === null) {
    heading = lab.name
  }

  return (
    <H
      title={title}
      heading={heading}
      subHeading={subHeading}
      content={<LabWebSite lab={lab} />}
    />
  )
}

LabHeader.defaultProps = {
  title: "Labs",
  heading: null,
  subHeading: null,
}

export default LabHeader
