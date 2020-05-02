import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"
import HideSmall from "../hidesmall"
import Column from "../column"
import logo from "../../assets/svg/icg-logo.svg"
import whitelogo from "../../assets/svg/icg-logo-white.svg"
import ShowSmall from "../showsmall"

const Header = ({ title, content, menuContent }) => (
  <>
    <ShowSmall className="bg-blue-columbia-80">
      <nav aria-label="Navigation" className="row p-3">
        <SlideMenu title={title} />
        <Link to="/">
          <img src={whitelogo} className="h-10" />
        </Link>
      </nav>
    </ShowSmall>

    <HideSmall className="bg-white border-b border-solid border-gray-200">
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
        <Container className="py-1">
          <Column isVCentered={true} className="justify-between">
            <HeaderLinks />

            {menuContent !== null && menuContent}
          </Column>
        </Container>
      </nav>

      <div className="py-2">
        <Container>
          <Column isVCentered={true} className="justify-between">
            <Link to="/" className="mr-8">
              {/* <ColumbiaICGWhiteImage style={{ width: `400px` }} /> */}

              <img src={logo} className="h-16" />
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
