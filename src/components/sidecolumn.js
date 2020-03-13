import React from "react"
import Column from "./column"

const SideColumn = ({ w, children, className }) => (
  <Column w={w} className={`hidden md:block ${className}`}>
    {children}
  </Column>
)

SideColumn.defaultProps = {
  w: "4",
  className: "",
}

export default SideColumn
