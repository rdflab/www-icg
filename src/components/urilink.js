import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const URILink = ({ to }) => (
  <div class="columns">
    <div className="column is-1">
      <RightSideIconLink>
        <FaGlobeAmericas size={28} />
      </RightSideIconLink>
    </div>
    <div className="column">
      <a href={`${to}`}>{to}</a>
    </div>
  </div>
)

export default URILink
