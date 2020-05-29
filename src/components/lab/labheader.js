import React from "react"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import ShowSmall from "../showsmall"
import WhiteLinkExt from "../whitelinkext"

const LabWebSite = ({ lab }) => {
  const ret = []

  if (lab.url !== "") {
    ret.push(<div className="uppercase mb-4">Lab website</div>)
    ret.push(
      <div>
        <WhiteLinkExt to={lab.url}>{lab.url}</WhiteLinkExt>
      </div>
    )
  }

  return <div>{ret}</div>
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
        <div className="bg-blue-columbia-50 py-4 text-white">
          <Container>
            <div>
              <div className="uppercase mb-4">{title}</div>
              <div className="text-4xl font-semibold">{heading}</div>
              <div className="text-2xl">{subHeading}</div>
            </div>
          </Container>
        </div>
        <div className="bg-blue-columbia-60 py-4 text-white">
          <Container></Container>
        </div>
      </ShowSmall>
      <HideSmall className="relative w-full mb-16">
        <Column className="w-full h-full absolute bg-white ">
          <Column className="w-6/10 bg-blue-columbia-50 p-8 px-32"></Column>
          <Column className="w-4/10 bg-blue-columbia-60 p-8 text-white"></Column>
        </Column>
        <Container className="z-20 relative">
          <Column>
            <MainColumn className="w-6/10 py-8">
              <div className="text-white">
                <div className="uppercase mb-4">{title}</div>
                <div className="text-4xl font-semibold">{heading}</div>
                <div className="text-2xl">{subHeading}</div>
              </div>
            </MainColumn>
            <SideColumn className="py-8 text-white">
              <LabWebSite lab={lab} />
            </SideColumn>
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
