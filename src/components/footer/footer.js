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
        <Columns className="items-center">
          <Column w="1/3" className="text-center">
            <FooterLinks />
          </Column>
          <Column w="1/3" className="text-center py-4">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </Column>
          <Column w="1/3" className="text-center">
            &copy; {new Date().getFullYear()} {siteTitle}
          </Column>
        </Columns>
      </Container>
    </footer>
  )
}

export default Footer
