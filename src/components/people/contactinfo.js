import React from "react"
import EmailLink from "../emaillink"
import PhoneLink from "../phonelink"
import URLLink from "../urllink"

const ContactInfo = ({ person, urls, className }) => {
  if (urls.length === 0 && person.frontmatter.urls.length > 0) {
    urls = person.frontmatter.urls
  }

  return (
    <div className={`w-full ${className}`}>
      {person.frontmatter.email.length > 0 && (
        <EmailLink to={person.frontmatter.email[0]} />
      )}
      {person.frontmatter.phone.length > 0 && (
        <PhoneLink numbers={person.frontmatter.phone} />
      )}
      {urls.length > 0 && <URLLink urls={urls} />}
    </div>
  )
}

ContactInfo.defaultProps = {
  className: "",
  urls: [],
}

export default ContactInfo
