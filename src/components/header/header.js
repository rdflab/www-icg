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
    <div className="sm:hidden">
      <div className="mobile-header">
        <SlideMenu />
        <Link to="/">
          <ColumbiaICGWhiteImage style={{ width: `300px` }} />
        </Link>
      </div>
    </div>

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

      <div className="bg-blue-columbia py-3">
        <Container>
          <Row className="items-center">
            <HeaderLinks />
          </Row>
        </Container>
      </div>
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
