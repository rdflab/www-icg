import React from "react"
import { FaPhone } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import LinkBlock from "./linkblock"

const PhoneLink = ({ numbers }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaPhone />
    </RightSideIconLink>
    <a href={`tel:${numbers[0]}`}>{numbers[0]}</a>
  </LinkBlock>
)

export default PhoneLink
