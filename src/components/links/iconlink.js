import React from "react"
import Column from "../column"

const IconLink = ({ icon, content }) => (
  <Column isVCentered={true} isMobile={true} className="my-1 mr-4">
    <div className="mr-2">{icon}</div>

    <div>{content}</div>
  </Column>
)

export default IconLink
