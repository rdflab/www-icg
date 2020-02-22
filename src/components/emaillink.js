import React from "react"
import { FaEnvelope } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const EmailLink = ({ to }) => (
  <div>
    <RightSideIconLink>
      <FaEnvelope />
    </RightSideIconLink>{" "}
    <a href={`mailto:${to}`}>{to}</a>
  </div>
)

export default EmailLink
