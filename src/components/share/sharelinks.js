import React from "react"
import Column from "../column"
import LinkExt from "../links/linkext"
import useSiteMetadata from "../../hooks/sitemetadata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import TwitterSvg from "../../assets/svg/twitter.svg"
// import FacebookSvg from "../../assets/svg/facebook.svg"
// import LinkedinSvg from "../../assets/svg/linkedin.svg"

// import TwitterSvgWhite from "../../assets/svg/twitter-white.svg"
// import FacebookSvgWhite from "../../assets/svg/facebook-white.svg"
// import LinkedinSvgWhite from "../../assets/svg/linkedin-white.svg"

const ShareLink = ({ to, icon, size, color, opacity }) => (
  <div className="ml-4">
    <LinkExt to={to}>
      <FontAwesomeIcon
        icon={["fab", icon]}
        className={`${size} ${color} opacity-${opacity[0]} hover:opacity-${opacity[1]} trans-ani`}
      />
    </LinkExt>
  </div>
)

const ShareLinks = ({ color, size, opacity, path }) => {
  const { siteUrl } = useSiteMetadata()

  const href = `${siteUrl}${path}`

  return (
    <Column isMobile={true} className={`items-center md:justify-end`}>
      <ShareLink
        to={`https://www.facebook.com/sharer.php?u=${href}`}
        icon="facebook"
        size={size}
        color={color}
        opacity={opacity}
      />
      <ShareLink
        to={`https://twitter.com/share?ref_src=${href}`}
        icon="twitter"
        size={size}
        color={color}
        opacity={opacity}
      />
      <ShareLink
        to={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
        icon="linkedin"
        size={size}
        color={color}
        opacity={opacity}
      />
    </Column>
  )

  // const className = `opacity-${opacity[0]} hover:opacity-${opacity[1]} trans-ani ${size}`

  // switch (color) {
  //   case "white":
  //     return (
  //       <Column isMobile={true} className={`items-center md:justify-end`}>
  //         <div>
  //           <LinkExt to={`https://www.facebook.com/sharer.php?u=${href}`}>
  //             <img
  //               src={FacebookSvgWhite}
  //               className={className}
  //               alt="Share on Facebook"
  //             />
  //           </LinkExt>
  //         </div>
  //         <div className="ml-5">
  //           <LinkExt to={`https://twitter.com/share?ref_src=${href}`}>
  //             <img
  //               src={TwitterSvgWhite}
  //               className={className}
  //               alt="Share on Twitter"
  //             />
  //           </LinkExt>
  //         </div>
  //         <div className="ml-5">
  //           <LinkExt
  //             to={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
  //           >
  //             <img
  //               src={LinkedinSvgWhite}
  //               className={className}
  //               alt="Share on Linkedin"
  //             />
  //           </LinkExt>
  //         </div>
  //       </Column>
  //     )
  //   default:
  //     return (
  //       <Column isMobile={true} className={`items-center md:justify-end`}>
  //         <div>
  //           <LinkExt to={`https://www.facebook.com/sharer.php?u=${href}`}>
  //             <img
  //               src={FacebookSvg}
  //               className={className}
  //               alt="Share on Facebook"
  //             />
  //           </LinkExt>
  //         </div>
  //         <div className="ml-5">
  //           <LinkExt to={`https://twitter.com/share?ref_src=${href}`}>
  //             <img
  //               src={TwitterSvg}
  //               className={className}
  //               alt="Share on Twitter"
  //             />
  //           </LinkExt>
  //         </div>
  //         <div className="ml-5">
  //           <LinkExt
  //             to={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
  //           >
  //             <img
  //               src={LinkedinSvg}
  //               className={className}
  //               alt="Share on Linkedin"
  //             />
  //           </LinkExt>
  //         </div>
  //       </Column>
  //     )
  // }
}

ShareLinks.defaultProps = {
  color: "text-white",
  opacity: [50, 95],
  size: "text-2xl",
  path: "",
}

export default ShareLinks
