import React from "react"
import { FaPhone } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const PhoneLink = ({ phoneNumbers }) => (
  <div>
    <RightSideIconLink><FaPhone /></RightSideIconLink> <a href={`tel:${phoneNumbers[0]}`}>{phoneNumbers[0]}</a>
  </div>
)

export default PhoneLink
