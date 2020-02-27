import React from "react"
import { FaPhone } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import LinkBlock from "./linkblock"

const PhoneLink = ({ phoneNumbers }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaPhone />
    </RightSideIconLink>
    <a href={`tel:${phoneNumbers[0]}`}>{phoneNumbers[0]}</a>
  </LinkBlock>
)

export default PhoneLink
