import React from "react"
import Column from "./column"

const SideColumn = ({ w, children }) => (
  <Column w={w} className="is-hidden-mobile hidden sm:block">
    {children}
  </Column>
)

SideColumn.defaultProps = {
  w: "4",
}

export default SideColumn
