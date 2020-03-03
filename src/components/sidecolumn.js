import React from "react"
import Column from "./column"

const SideColumn = ({ children }) => (
  <Column w="4/12" className="is-hidden-mobile hidden sm:block">
    {children}
  </Column>
)

export default SideColumn
