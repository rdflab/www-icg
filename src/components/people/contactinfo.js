import React from "react"
import EmailLink from "../links/emaillink"
import PhoneLink from "../links/phonelink"
import URLLink, { urlLink } from "../links/urllink"
import RoomLink from "../links/roomlink"
import WhiteLinkExt from "../links/whitelinkext"
import ColorLinkExt from "../links/colorlinkext"

const ContactInfo = ({
  person,
  urls,
  color,
  className,
  showIcons,
  showUrl,
}) => {
  if (showIcons) {
    return (
      <div className={`w-full h-full  ${className}`}>
        {person.frontmatter.email !== "" && (
          <EmailLink color={color} to={person.frontmatter.email} />
        )}
        {person.frontmatter.phone !== "" && (
          <PhoneLink color={color} phone={person.frontmatter.phone} />
        )}
        {person.frontmatter.room !== "" && (
          <RoomLink color={color} room={person.frontmatter.room} />
        )}
        {showUrl && person.frontmatter.url.length > 0 && (
          <URLLink color={color} url={person.frontmatter.url} />
        )}
      </div>
    )
  } else {
    return (
      <div className={`w-full h-full  ${className}`}>
        {person.frontmatter.email !== "" && (
          <div className="mt-1">
            <ColorLinkExt
              color={color}
              to={`mailto:${person.frontmatter.email}`}
            >
              {person.frontmatter.email}
            </ColorLinkExt>
          </div>
        )}
        {person.frontmatter.phone !== "" && (
          <div className="mt-1">
            <ColorLinkExt color={color} to={`tel:${person.frontmatter.phone}`}>
              {person.frontmatter.phone}
            </ColorLinkExt>
          </div>
        )}
        {person.frontmatter.room !== "" && (
          <div className={`mt-1 text-${color}`}>
            Room {person.frontmatter.room}
          </div>
        )}
        {showUrl && person.frontmatter.url.length > 0 && (
          <div className="mt-1">{urlLink(person.frontmatter.url, color)}</div>
        )}
      </div>
    )
  }
}

ContactInfo.defaultProps = {
  className: "",
  url: "",
  color: "gray",
  showIcons: true,
  showUrl: true,
}

export default ContactInfo
