import React from "react"
import Column from "./column"

const MainColumn = ({ w, children, className }) => (
  <Column w={w} className={className}>
    {children}
  </Column>
)

MainColumn.defaultProps = {
  w: "w-9/12",
  className: "",
}

export default MainColumn
