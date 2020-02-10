import React from "react"
import { Link } from "gatsby"
import HICCCImage from "./hicccimage"

import footerStyles from "./footer.module.scss"
import { Container, Row, Col } from "react-bootstrap"
import FooterLinks from "./footerlinks"


const Footer = props => {
  const { siteTitle } = props
  return (
    <footer className={footerStyles.footer}>
      <Container>
        <Row>
          <Col>
            <FooterLinks></FooterLinks>
          </Col>
          <Col className={`text-center`}>
            <HICCCImage />
          </Col>
          <Col className={`text-right`}>
            &copy; {new Date().getFullYear()} {siteTitle}
          </Col>

        </Row>

      </Container>
    </footer>
  )
}

export default Footer
