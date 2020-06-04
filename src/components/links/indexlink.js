import React from "react"
import ColorLink from "./colorlink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IndexLink = ({ color, to, children }) => (
  <>
    <ColorLink color={color} to={to}>
      {children}
    </ColorLink>
    <FontAwesomeIcon
      icon="chevron-right"
      className={`${color} inline align-center ml-1 text-xl`}
    />
  </>
)

export default IndexLink
