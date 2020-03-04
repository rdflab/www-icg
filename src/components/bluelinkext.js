import React from "react"

const BlueLinkExt = ({ to, children, target }) => (
  <a className="blue-link" href={to} target={target}>
    {children}
  </a>
)

BlueLinkExt.defaultProps = {
  target: "",
}

export default BlueLinkExt
