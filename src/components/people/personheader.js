import React from "react"
import { personName } from "../../utils/personname"
import HideSmall from "../hidesmall"
import Column from "../column"
import Container from "../container"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import ContactInfo from "./contactinfo"
import ShowSmall from "../showsmall"

const PersonHeader = ({ person, title, heading, subHeading }) => {
  if (heading === null) {
    heading = personName(person)
  }

  if (subHeading === null) {
    subHeading = person.frontmatter.title
  }

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
          <Container>
            <div className="uppercase mb-4">Contact</div>
            <ContactInfo person={person} color="white" />
          </Container>
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
              <div>
                <div className="uppercase mb-4">Contact</div>
                <ContactInfo person={person} color="white" />
              </div>
            </SideColumn>
          </Column>
        </Container>
      </HideSmall>
    </>
  )
}

PersonHeader.defaultProps = {
  title: "People",
  heading: null,
  subHeading: null,
}

export default PersonHeader
