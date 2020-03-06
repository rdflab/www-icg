import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "../images/columbiaicgimage"
import ColumbiaICGWhiteImage from "../images/columbiaicgwhiteimage"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"
import Row from "../row"

const Header = ({ siteTitle }) => (
  <>
    <nav
      aria-label="Navigation"
      className="row text-white p-3 bg-blue-columbia-80"
    >
      <SlideMenu />
      <Link to="/">
        <ColumbiaICGWhiteImage style={{ width: `300px` }} />
      </Link>
    </nav>

    <div className="hidden sm:block">
      <div className="p-3">
        <Container>
          <Row>
            <Link to="/">
              <ColumbiaICGImage style={{ width: `400px` }} />
            </Link>
          </Row>
        </Container>
      </div>

      <nav aria-label="Navigation" className="bg-blue-columbia-80 py-3">
        <Container>
          <Row className="items-center">
            <HeaderLinks />
          </Row>
        </Container>
      </nav>
    </div>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
