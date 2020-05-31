import React from "react"
import EmailLink from "../emaillink"
import PhoneLink from "../phonelink"
import URLLink from "../urllink"
import RoomLink from "../roomlink"
import Column from "../column"

const ContactInfo2 = ({ person, urls, className }) => {
  if (urls.length === 0 && person.frontmatter.urls.length > 0) {
    urls = person.frontmatter.urls
  }

  return (
    <Column className={className}>
      {person.frontmatter.email.length > 0 && (
        <EmailLink to={person.frontmatter.email[0]} />
      )}
      {person.frontmatter.phone.length > 0 && (
        <PhoneLink numbers={person.frontmatter.phone} />
      )}
      {person.frontmatter.room !== "" && (
        <RoomLink room={person.frontmatter.room} />
      )}
      {urls.length > 0 && <URLLink urls={urls} />}
    </Column>
  )
}

ContactInfo2.defaultProps = {
  className: "",
  url: [],
}

export default ContactInfo2
