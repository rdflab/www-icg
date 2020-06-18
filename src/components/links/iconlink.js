import React from "react"
import Column from "../column"

const IconLink = ({ icon, content }) => (
  <Column isVCentered={true} isMobile={true}>
    <div className="w-10 mr-2">{icon}</div>

    <div>{content}</div>
  </Column>
)

export default IconLink
