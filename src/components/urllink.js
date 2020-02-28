import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import LinkBlock from "./linkblock"

const URLLink = ({ urls }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaGlobeAmericas />
    </RightSideIconLink>{" "}
    <a href={`${urls[0]}`}>{urls[0]}</a>
  </LinkBlock>
)

export default URLLink
