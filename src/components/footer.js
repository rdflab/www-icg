import React from "react"
import { Link } from "gatsby"
import HICCCImage from "./hicccimage"

import footerStyles from "./footer.module.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const Footer = props => {
  const { siteTitle } = props
  return (
    <footer className={footerStyles.footer}>
      <Container>
        <Row>
          <Col>
            <Link to={`about`}>About Us</Link>
            <Link to={`pressroom`}>Pressroom</Link>
          </Col>
          <Col className={`justify-content-md-center`}>
            <HICCCImage />
          </Col>
          <Col>
            &copy; {new Date().getFullYear()} {siteTitle}
          </Col>

        </Row>

      </Container>
    </footer>
  )
}

export default Footer
