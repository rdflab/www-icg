import React from "react"
import Column from "./column"

const MainColumn = ({ w, children }) => (
  <Column w={w} className="mr-4">
    {children}
  </Column>
)

MainColumn.defaultProps = {
  w: "8/12",
}

export default MainColumn
