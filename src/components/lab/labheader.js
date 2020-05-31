import React from "react"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import ShowSmall from "../showsmall"
import WhiteLinkExt from "../whitelinkext"

const LabWebSite = ({ lab }) => {
  if (lab.url !== "") {
    return (
      <div>
        <h5>
          <WhiteLinkExt to={lab.url[1]}>{lab.url[0]}</WhiteLinkExt>
        </h5>
      </div>
    )
  } else {
    return <></>
  }
}

const LabHeader = ({ lab, title, heading, subHeading }) => {
  if (heading === null) {
    heading = lab.name
  }

  ////if (subHeading === null) {
  //  subHeading = person.frontmatter.title
  //}

  return (
    <>
      <ShowSmall>
        <div className="bg-blue-400 py-4 text-white">
          <Container>
            <div>
              <div className="uppercase mb-4">{title}</div>
              <div className="text-4xl font-semibold">{heading}</div>
              <div className="text-2xl">{subHeading}</div>
            </div>
          </Container>
        </div>
        <div className="bg-blue-600 py-4 text-white">
          <Container></Container>
        </div>
      </ShowSmall>
      <HideSmall className="relative w-full bg-columbia-secondary-blue py-8">
        {/* <Column className="w-full h-full absolute bg-white text-white">
          <Column className="w-6/10 bg-columbia-secondary-blue p-8 px-32"></Column>
          <Column className="w-4/10 bg-columbia-secondary-blue p-8"></Column>
        </Column> */}
        <Container className="z-20 relative">
          <Column isVCentered={true}>
            <Column className="w-7/10">
              <div className="text-white">
                <div className="uppercase mb-4">{title}</div>
                <div className="text-4xl font-semibold">{heading}</div>
                <div className="text-2xl">{subHeading}</div>
              </div>
            </Column>
            <Column className="text-white">
              <LabWebSite lab={lab} />
            </Column>
          </Column>
        </Container>
      </HideSmall>
    </>
  )
}

LabHeader.defaultProps = {
  title: "Labs",
  heading: null,
  subHeading: null,
}

export default LabHeader
