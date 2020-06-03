import React from "react"
import EmailLink from "../links/emaillink"
import PhoneLink from "../links/phonelink"
import URLLink from "../links/urllink"
import RoomLink from "../links/roomlink"

const ContactInfo = ({ person, urls, color, className }) => (
  <div className={`w-full mb-4 md:mb-0 ${className}`}>
    {person.frontmatter.email !== "" && (
      <EmailLink color={color} to={person.frontmatter.email} />
    )}
    {person.frontmatter.phone !== "" && (
      <PhoneLink color={color} phone={person.frontmatter.phone} />
    )}
    {person.frontmatter.room !== "" && (
      <RoomLink color={color} room={person.frontmatter.room} />
    )}
    {person.frontmatter.url.length > 0 && (
      <URLLink color={color} url={person.frontmatter.url} />
    )}
  </div>
)

ContactInfo.defaultProps = {
  className: "",
  url: [],
  color: "gray",
}

export default ContactInfo
