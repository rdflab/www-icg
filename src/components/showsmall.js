import React from "react"
import HideSmall from "./hidesmall"

const ShowSmall = ({ children, size, show, className }) => (
  <HideSmall className={className} show={true}>
    {children}
  </HideSmall>
)

ShowSmall.defaultProps = {
  className: "",
}

export default ShowSmall
