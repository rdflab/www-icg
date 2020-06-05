import React from "react"

const ExtLink = ({ to, children, target, className }) => (
  <a className={`${className}`} href={to} target={target}>
    {children}
  </a>
)

ExtLink.defaultProps = {
  target: "_blank",
  className: "",
}

export default ExtLink
