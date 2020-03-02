import React from "react"
import { FaEnvelope } from "react-icons/fa"
import IconLink from "./iconlink"

const EmailLink = ({ to }) => (
  <IconLink
    icon={<FaEnvelope className="text-gray-600" />}
    content={
      <a href={`mailto:${to}`} className="blue-link">
        {to}
      </a>
    }
  />
)

export default EmailLink
