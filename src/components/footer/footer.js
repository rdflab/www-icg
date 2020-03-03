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
        <Columns className="is-vcentered">
          <Column className="text-center">
            <FooterLinks />
          </Column>
          <Column className="text-center py-4">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </Column>
          <Column className="text-center">
            &copy; {new Date().getFullYear()} {siteTitle}
          </Column>
        </Columns>
      </Container>
    </footer>
  )
}

export default Footer
