import React from "react"
import Column from "./column"

const SmallColumn = ({ children }) => (
  <Column w="4/12" className="is-hidden-tablet sm:hidden">
    {children}
  </Column>
)

export default SmallColumn
