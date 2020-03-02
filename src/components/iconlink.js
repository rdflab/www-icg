import React from "react"
import Columns from "./columns"
import Column from "./column"

const IconLink = ({ icon, content }) => (
  <Columns isMobile={true} className="items-center mb-2">
    <Column isMobile={true} w="1/12">
      {icon}
    </Column>
    <Column isMobile={true}>{content}</Column>
  </Columns>
)

export default IconLink
