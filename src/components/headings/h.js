import React from "react"
import Container from "../container"

const H = ({ children, className, style }) => (
  // <div className="border-b border-solid border-columbia-secondary-blue py-2 mb-8">
  //   <h4 className="text-columbia-secondary-blue">{children}</h4>
  // </div>

  <div className="bg-columbia-secondary-blue text-white py-8">
    <Container>
      <h1>{children}</h1>
    </Container>
  </div>
)

H.defaultProps = {
  className: "",
  style: {},
}

export default H
