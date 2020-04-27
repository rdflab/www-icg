import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import IconLink from "./iconlink"

const URLLink = ({ url }) => (
  <IconLink
    icon={<FaGlobeAmericas className="text-gray-600" />}
    content={
      <a href={`${url}`} className="blue-link">
        {url}
      </a>
    }
  />
)

export default URLLink
