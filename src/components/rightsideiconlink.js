import React from "react"
import { IconContext } from "react-icons"

const RightSideIconLink = ({ children }) => (
  <IconContext.Provider value={{ size: 20, color: "rgba(0, 0, 0, 0.8)" }}>
    <span style={{paddingRight: "0.5rem"}}>{children}</span>
  </IconContext.Provider>
)

export default RightSideIconLink
