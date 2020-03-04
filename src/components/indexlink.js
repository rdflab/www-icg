import React from "react"
import ColorLink from "./colorlink"
import { FaChevronRight } from "react-icons/fa"
import Row from "./row"

const IndexLink = ({ color, to, children }) => (
  <>
    <ColorLink color={color} to={to}>
      {children}
    </ColorLink>
    <FaChevronRight className={`${color} inline align-bottom ml-1`} />
  </>
)

export default IndexLink
