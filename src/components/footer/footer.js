import React from "react"
import HICCCImage from "../hicccimage"
import FooterLinks from "./footerlinks"
import Container from "../container"
import Column from "../column"

const Footer = ({ siteTitle }) => {
  return (
    <footer className="text-white text-sm mt-8 py-8 bg-blue-columbia-80">
      <Container>
        <Column isVCentered={true}>
          <Column w="6" className="mb-8 justify-center md:justify-start">
            <FooterLinks />
          </Column>
          <Column w="6" className="mb-8 justify-center md:justify-end">
            <div>
              &copy; {new Date().getFullYear()} {siteTitle}
            </div>
          </Column>
        </Column>

        <div className="row items-center justify-center md:justify-start">
          <a href="https://cumc.columbia.edu">
            <HICCCImage style={{ width: "400px" }} />
          </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
