import React from "react"
import { FaPhone } from "react-icons/fa"
import { IconContext } from "react-icons"
import RightSideIconLink from "./rightsideiconlink"

const PhoneLink = ({ phoneNumbers }) => (
  <div class="columns">
    <div className="column is-1">
      <RightSideIconLink>
        <FaPhone size={28} />
      </RightSideIconLink>
    </div>
    <div className="column">
      {phoneNumbers.map(phoneNumber => (
        <div>
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </div>
      ))}
    </div>
  </div>
)

export default PhoneLink
