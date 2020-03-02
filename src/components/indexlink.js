import React from "react"
import ColorLink from "./colorlink"
import { FaChevronRight } from "react-icons/fa"

const IndexLink = ({ color, to, children }) => (
  <>
    <ColorLink color={color} to={to}>
      {children}
    </ColorLink>
    <FaChevronRight className={`${color} inline ml-2`} />
  </>
)

export default IndexLink
