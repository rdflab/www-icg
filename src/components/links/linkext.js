import React from "react"

const LinkExt = ({ to, children, target, className }) => (
  <a className={`${className}`} href={to} target={target}>
    {children}
  </a>
)

LinkExt.defaultProps = {
  target: "_blank",
  className: "",
}

export default LinkExt
