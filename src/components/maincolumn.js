import React from "react"
import Column from "./column"

const MainColumn = ({ w, children, className }) => (
  <Column w={w} className={`mr-8 ${className}`}>
    {children}
  </Column>
)

MainColumn.defaultProps = {
  w: "8/12",
  className: "",
}

export default MainColumn
