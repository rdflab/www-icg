import React from "react"
import Column from "../column"
import ExtLink from "../links/extlink"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"

const ShareLinks = ({ url, color, size, opacity }) => (
  <Column isMobile={true} className={`${color} items-center md:justify-end`}>
    <div>
      <ExtLink to={`https://www.facebook.com/sharer.php?u=${url}`}>
        <FaFacebook
          className={`${opacity} hover:opacity-100 trans-ani`}
          size={size}
        />
      </ExtLink>
    </div>
    <div className="ml-4">
      <ExtLink to={`https://twitter.com/share?ref_src=${url}`}>
        <FaTwitter
          className={`${opacity} hover:opacity-100 trans-ani`}
          size={size}
        />
      </ExtLink>
    </div>
    <div className="ml-4">
      <ExtLink
        to={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        <FaLinkedin
          className={`${opacity} hover:opacity-100 trans-ani`}
          size={size}
        />
      </ExtLink>
    </div>
  </Column>
)

ShareLinks.defaultProps = {
  color: "text-blue-500",
  opacity: "opacity-70",
  size: "1.8rem",
}

export default ShareLinks
