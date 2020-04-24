import React from "react"
import Column from "./column"

const MainColumn = ({ w, children, className }) => (
  <Column w={w} className={className}>
    {children}
  </Column>
)

MainColumn.defaultProps = {
  w: 8,
  className: "",
}

export default MainColumn
