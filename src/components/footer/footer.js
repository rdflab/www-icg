import React from "react"
import HICCCImage from "../hicccimage"
import FooterLinks from "./footerlinks"
import Container from "../container"

import Column from "../column"
import HideSmall from "../hidesmall"

const Footer = ({ siteTitle }) => {
  return (
    <footer className="text-white text-sm h-48 p-8 mt-8 bg-blue-columbia-80">
      <HideSmall>
        <Container>
          <Column isVCentered={true}>
            <Column w="4" className="">
              <FooterLinks />
            </Column>
            <Column w="4" isCentered={true} className="text-center">
              <a href="https://cumc.columbia.edu">
                <HICCCImage style={{ width: "350px" }} />
              </a>
            </Column>
            <Column w="4" isCentered={true}>
              <div>
                &copy; {new Date().getFullYear()} {siteTitle}
              </div>
            </Column>
          </Column>
        </Container>
      </HideSmall>

      <HideSmall show={true}>
        <Container>
          <FooterLinks />
          <div className="w-full text-center mt-4">
            &copy; {new Date().getFullYear()} {siteTitle}
          </div>

          <div className="w-full text-center mt-4">
            <a href="https://cumc.columbia.edu">
              <HICCCImage style={{ width: "350px" }} className="mx-auto" />
            </a>
          </div>
        </Container>
      </HideSmall>
    </footer>
  )
}

export default Footer
