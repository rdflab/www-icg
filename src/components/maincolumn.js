import React from "react"
import Column from "./column"

const MainColumn = ({ children }) => (
  <Column w="2/3" className="mr-4">
    {children}
  </Column>
)

export default MainColumn
