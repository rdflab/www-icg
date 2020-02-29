import React from "react"

const Container = ({ children, className }) => (
  <div class={`container md:mx-auto ${className}`}>{children}</div>
)

Container.defaultProps = {
  className: "",
}

export default Container
