import React from "react"
import { IconContext } from "react-icons"

const RightSideIconLink = ({ children }) => (
  <IconContext.Provider value={{ color: "rgba(0, 0, 0, 0.7)" }}>
    {children}
  </IconContext.Provider>
)

export default RightSideIconLink
