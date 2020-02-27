import React from "react"
import { FaEnvelope } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import LinkBlock from "./linkblock"

const EmailLink = ({ to }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaEnvelope />
    </RightSideIconLink>
    <a href={`mailto:${to}`}>{to}</a>
  </LinkBlock>
)

export default EmailLink
