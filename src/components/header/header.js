import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "../images/columbiaicgimage"
import ColumbiaICGWhiteImage from "../images/columbiaicgwhiteimage"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"
import HideSmall from "../hidesmall"
import Column from "../column"
import logo from "../../assets/svg/icg-logo-white.svg"

const Header = ({ title, content, menuContent }) => (
  <>
    <HideSmall show={true}>
      <nav
        aria-label="Navigation"
        className="row text-white p-3 bg-blue-columbia-80"
      >
        <SlideMenu title={title} />
        <Link to="/">
          <ColumbiaICGWhiteImage style={{ width: `800px` }} />
        </Link>
      </nav>
    </HideSmall>

    <HideSmall className="bg-white">
      {/* <div className="p-3">
        <Container>
          <Column isVCentered={true} className="justify-between">
            <Link to="/" className="mr-8">
              <ColumbiaICGImage style={{ width: `400px` }} />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div> */}

      <nav aria-label="Navigation">
        <Container className="py-2">
          <Column isVCentered={true} className="justify-between">
            <HeaderLinks />

            {menuContent !== null && menuContent}
          </Column>
        </Container>
      </nav>

      <div className="p-3 bg-blue-columbia-80">
        <Container>
          <Column isVCentered={true} className="justify-between">
            <Link to="/" className="mr-8">
              {/* <ColumbiaICGWhiteImage style={{ width: `400px` }} /> */}

              <img src={logo} style={{ width: "500px" }} />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div>
    </HideSmall>
  </>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: "",
  content: null,
  menuContent: null,
}

export default Header
