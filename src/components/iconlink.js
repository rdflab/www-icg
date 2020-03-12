import React from "react"
import Columns from "./columns"
import Column from "./column"

const IconLink = ({ icon, content }) => (
  <Columns isMobile={true} isVCentered={true} className="mb-2">
    <Column isMobile={true} className="w-2/12 lg:w-1/12">
      {icon}
    </Column>
    <Column isMobile={true} className="w-10/12 lg:w-11/12">
      {content}
    </Column>
  </Columns>
)

export default IconLink
