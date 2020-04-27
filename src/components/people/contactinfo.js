import React from "react"
import EmailLink from "../emaillink"
import PhoneLink from "../phonelink"
import URLLink from "../urllink"
import RoomLink from "../roomlink"

const ContactInfo = ({ person, urls, className }) => (
  <div className={`w-full mb-4 md:mb-0 ${className}`}>
    {person.frontmatter.email !== "" && (
      <EmailLink to={person.frontmatter.email[0]} />
    )}
    {person.frontmatter.phone !== "" && (
      <PhoneLink numbers={person.frontmatter.phone} />
    )}
    {person.frontmatter.room !== "" && (
      <RoomLink room={person.frontmatter.room} />
    )}
    {person.frontmatter.url !== "" && <URLLink url={person.frontmatter.url} />}
  </div>
)

ContactInfo.defaultProps = {
  className: "",
  url: "",
}

export default ContactInfo
