import React from "react"

const WhiteLinkExt = ({ to, children, target }) => (
  <a className="white-link" href={to} target={target}>
    {children}
  </a>
)

WhiteLinkExt.defaultProps = {
  target: "",
}

export default WhiteLinkExt
