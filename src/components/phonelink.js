import React from "react"
import { FaPhone } from "react-icons/fa"
import IconLink from "./iconlink"

const PhoneLink = ({ numbers }) => (
  <IconLink
    icon={<FaPhone className="text-gray-600" />}
    content={
      <a href={`tel:${numbers[0]}`} className="blue-link">
        {numbers[0]}
      </a>
    }
  />
)

export default PhoneLink
