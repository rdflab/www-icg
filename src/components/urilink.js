import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const URILink = ({ to }) => (
  <div>
    <RightSideIconLink>
      <FaGlobeAmericas />
    </RightSideIconLink>{" "}
    <a href={`${to}`}>{to}</a>
  </div>
)

export default URILink
