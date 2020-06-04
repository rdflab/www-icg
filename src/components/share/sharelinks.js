import React from "react"
import Column from "../column"
import ExtLink from "../links/extlink"
import useSiteMetadata from "../../hooks/sitemetadata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ShareLinks = ({ color, size, opacity, path }) => {
  const { siteUrl } = useSiteMetadata()

  const href = `${siteUrl}${path}`

  return (
    <Column isMobile={true} className={`${color} items-center md:justify-end`}>
      <div>
        <ExtLink to={`https://www.facebook.com/sharer.php?u=${href}`}>
          <FontAwesomeIcon
            icon={["fab", "facebook"]}
            className={`opacity-90 hover:${opacity} trans-ani text-3xl`}
          />
        </ExtLink>
      </div>
      <div className="ml-4">
        <ExtLink to={`https://twitter.com/share?ref_src=${href}`}>
          <FontAwesomeIcon
            icon={["fab", "twitter"]}
            className={`opacity-90 hover:${opacity} trans-ani text-3xl`}
          />
        </ExtLink>
      </div>
      <div className="ml-4">
        <ExtLink
          to={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
        >
          <FontAwesomeIcon
            icon={["fab", "linkedin"]}
            className={`opacity-90 hover:${opacity} trans-ani text-3xl`}
          />
        </ExtLink>
      </div>
    </Column>
  )
}

ShareLinks.defaultProps = {
  color: "text-blue-500",
  opacity: "opacity-70",
  size: "1.8rem",
  path: "",
}

export default ShareLinks
