import React from "react"
import Column from "../column"

const IconLink = ({ icon, content }) => (
  <Column isVCentered={true} isMobile={true} className="my-1">
    <div className="w-10">{icon}</div>

    <div className="w-full">{content}</div>
  </Column>
)

export default IconLink
