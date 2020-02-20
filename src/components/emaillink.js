import React from "react"
import { IconContext } from "react-icons"
import { FaEnvelope } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const EmailLink = ({ to }) => (
  <div class="columns">
    <div className="column is-1">
      <RightSideIconLink>
        <FaEnvelope size={28} />
      </RightSideIconLink>
    </div>
    <div className="column">
      <a href={`mailto:${to}`}>{to}</a>
    </div>
  </div>
)

export default EmailLink
