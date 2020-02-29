import React from "react"
import Column from "./column"

const SideColumn = ({ children }) => (
  <Column w="1/3" className="hidden sm:block">
    {children}
  </Column>
)

export default SideColumn
