import React from "react"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import ShowSmall from "../showsmall"
import ShareLinks from "../share/sharelinks"

const TitleDiv = ({ title, heading, subHeading }) => (
  <div>
    {title !== "" && <div className="uppercase py-2">{title}</div>}
    {heading !== "" && <h1>{heading}</h1>}
    {subHeading !== "" && <h3>{subHeading}</h3>}
  </div>
)

const H = ({ title, heading, subHeading, content, showShareLinks }) => {
  return (
    <div className="text-white bg-columbia-secondary-blue-70">
      <Container>
        <ShowSmall className="py-2">
          <TitleDiv title={title} heading={heading} subHeading={subHeading} />

          {content !== null && <div className="py-2">{content}</div>}
          {showShareLinks && (
            <div className="py-2">
              <ShareLinks url={window.location.href} color="text-white" />
            </div>
          )}
        </ShowSmall>
        <HideSmall className="pt-2 pb-4 ">
          <Column className="items-center justify-between">
            <TitleDiv title={title} heading={heading} subHeading={subHeading} />

            <Column>{content !== null && <div>{content}</div>}</Column>

            {showShareLinks && (
              <ShareLinks url={window.location.href} color="text-white" />
            )}
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
  content: null,
  showShareLinks: true,
}

export default H
