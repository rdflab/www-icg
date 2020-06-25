import React from "react"
import Column from "./column"

const SmallColumn = ({ children, className }) => (
  <Column className={`w-3/12 md:hidden ${className}`}>{children}</Column>
)

SmallColumn.defaultProps = {
  className: "",
}

export default SmallColumn
