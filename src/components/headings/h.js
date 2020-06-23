import React from "react"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import ShowSmall from "../showsmall"
import ShareLinks from "../share/sharelinks"

export const TitleDiv = ({ title, heading, subHeading }) => (
  <div>
    {title !== "" && <h5 className="uppercase mb-2">{title}</h5>}
    {heading !== "" && <h1>{heading}</h1>}
    {subHeading !== "" && <h3>{subHeading}</h3>}
  </div>
)

const H = ({
  title,
  heading,
  subHeading,
  content,
  showShareLinks,
  path,
  className,
}) => {
  return (
    <div className={`text-white w-full bg-columbia-blue-90 ${className}`}>
      <Container>
        <ShowSmall>
          <TitleDiv title={title} heading={heading} subHeading={subHeading} />

          {content !== null && <div>{content}</div>}
          {showShareLinks && (
            <div>
              <ShareLinks path={path} color="white" />
            </div>
          )}
        </ShowSmall>
        <HideSmall>
          <Column className="items-start justify-between">
            <TitleDiv title={title} heading={heading} subHeading={subHeading} />

            <Column>{content !== null && <div>{content}</div>}</Column>
          </Column>
        </HideSmall>
      </Container>
    </div>
  )
}

H.defaultProps = {
  title: "",
  heading: "",
  subHeading: "",
  path: "",
  content: null,
  showShareLinks: false,
  className: "",
}

export default H
