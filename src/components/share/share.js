import React from "react"
import Container from "../container"
import ShareLinks from "./sharelinks"

const Share = ({ url, color }) => (
  <Container className="py-4">
    <ShareLinks url={url} color={color} />
  </Container>
)

Share.defaultProps = {
  color: "text-white",
}

export default Share
