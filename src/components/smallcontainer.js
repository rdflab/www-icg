import React from "react"
import Container from "./container"

const SmallContainer = ({ children, className, style }) => (
  <Container>
    <Container className={className} style={style}>
      {children}
    </Container>
  </Container>
)

SmallContainer.defaultProps = {
  className: "",
  style: null,
}

export default SmallContainer
