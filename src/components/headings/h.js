import React from "react"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import ShowSmall from "../showsmall"
import FullDiv from "../fulldiv"

const TitleDiv = ({ title, heading, subHeading }) => (
  <FullDiv>
    {title !== "" && <div className="uppercase py-2">{title}</div>}
    {heading !== "" && <h1>{heading}</h1>}
    {subHeading !== "" && <h3>{subHeading}</h3>}
  </FullDiv>
)

const H = ({ title, heading, subHeading, content }) => {
  return (
    <>
      <ShowSmall className="bg-columbia-secondary-blue py-4 text-white">
        <Container>
          <TitleDiv title={title} heading={heading} subHeading={subHeading} />
        </Container>
        {content !== null && (
          <div className="pt-4">
            <Container>{content}</Container>
          </div>
        )}
      </ShowSmall>
      <HideSmall className="bg-columbia-secondary-blue pt-4 pb-6 text-white">
        <Container>
          <Column isVCentered={true}>
            <Column className="w-7/10">
              <TitleDiv
                title={title}
                heading={heading}
                subHeading={subHeading}
              />
            </Column>
            <Column>{content !== null && <FullDiv>{content}</FullDiv>}</Column>
          </Column>
        </Container>
      </HideSmall>
    </>
  )
}

H.defaultProps = {
  title: "",
  heading: "",
  subHeading: "",
  content: null,
}

export default H
