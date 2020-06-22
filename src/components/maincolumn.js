import React from "react"
import Column from "./column"

const MainColumn = ({ w, children, className }) => (
  <Column w={w} className={className}>
    {children}
  </Column>
)

MainColumn.defaultProps = {
  w: 9,
  className: "",
}

export default MainColumn
