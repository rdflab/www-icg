import React from "react"
import Columns from "./columns"
import Column from "./column"

const IconLink = ({ icon, content }) => (
  <Columns isMobile={true} isVCentered={true} className="mb-2">
    <Column isMobile={true} w="1">
      {icon}
    </Column>
    <Column isMobile={true}>{content}</Column>
  </Columns>
)

export default IconLink
