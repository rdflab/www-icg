import React from "react"
import ColorLink from "./colorlink"
import { FaChevronRight } from "react-icons/fa"

const IndexLink = ({ color, to, children }) => (
  <>
    <ColorLink color={color} to={to}>
      {children}
    </ColorLink>
    <FaChevronRight className={`${color} inline align-center ml-1`} />
  </>
)

export default IndexLink
