import React from "react"
import Columns from "./columns"
import Column from "./column"

const IconLink = ({ icon, content }) => (
  <Columns isMobile={true} isVCentered={true} className="mb-2">
    <Column isMobile={true} w="1/12">
      {icon}
    </Column>
    <Column isMobile={true} w="11/12">
      {content}
    </Column>
  </Columns>
)

export default IconLink
