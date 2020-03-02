import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import IconLink from "./iconlink"

const URLLink = ({ urls }) => (
  <IconLink
    icon={<FaGlobeAmericas className="text-gray-600" />}
    content={
      <a href={`${urls[0]}`} className="blue-link">
        {urls[0]}
      </a>
    }
  />
)

export default URLLink
