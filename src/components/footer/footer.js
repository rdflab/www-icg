import React from "react"
import HICCCImage from "../hicccimage"
import FooterLinks from "./footerlinks"
import Container from "../container"
import Column from "../column"
import Columns from "../columns"

const Footer = props => {
  const { siteTitle } = props
  return (
    <footer className="footer">
      <Container>
        <Columns isVCentered={true}>
          <Column w="1/3" className="pb-4">
            <FooterLinks />
          </Column>
          <Column w="1/3" className="hidden sm:block text-center pb-4">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </Column>
          <Column w="1/3" className="text-center pb-4">
            &copy; {new Date().getFullYear()} {siteTitle}
          </Column>
          <Column w="1/3" className="sm:hidden text-center pb-4">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </Column>
        </Columns>
      </Container>
    </footer>
  )
}

export default Footer
