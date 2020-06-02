import React from "react"
import HideSmall from "./hidesmall"

const ShowSmall = ({ children, size, show, className }) => (
  <HideSmall className={className} show={true} size={size}>
    {children}
  </HideSmall>
)

ShowSmall.defaultProps = {
  className: "",
  size: "md",
}

export default ShowSmall
