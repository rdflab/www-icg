import React from "react"
import Container from "../container"
import ShareLinks from "./sharelinks"

const Share = ({ path, color }) => (
  <Container className="py-4">
    <ShareLinks path={path} color={color} />
  </Container>
)

Share.defaultProps = {
  color: "text-white",
}

export default Share
