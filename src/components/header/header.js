import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "../columbiaicgimage"
import ColumbiaICGWhiteImage from "../columbiaicgwhiteimage"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"

const Header = ({ siteTitle }) => (
  <>
    <div className="sm:hidden">
      <div className="mobile-header">
        <SlideMenu />
        <Link to="/" style={{ borderBottom: "none" }}>
          <ColumbiaICGWhiteImage style={{ width: `300px` }} />
        </Link>
      </div>
    </div>

    <Container className="hidden sm:block my-2">
      <div className="col items-start p-0">
        <Link to="/" style={{ borderBottom: "none" }}>
          <ColumbiaICGImage style={{ width: `400px` }} />
        </Link>
        <div>
          <HeaderLinks />
        </div>
      </div>
    </Container>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
