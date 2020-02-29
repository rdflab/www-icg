import React from "react"
import Column from "./column"

const SmallColumn = ({ children }) => (
  <Column w="1/3" className="sm:hidden">
    {children}
  </Column>
)

export default SmallColumn
