import React from "react"
import Column from "./column"

const SmallColumn = ({ children, className }) => (
  <Column w="4" className={`md:hidden ${className}`}>
    {children}
  </Column>
)

SmallColumn.defaultProps = {
  className: "",
}

export default SmallColumn
