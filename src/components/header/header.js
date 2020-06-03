import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"
import HideSmall from "../hidesmall"
import Column from "../column"
//import logo from "../../assets/svg/icg-logo.svg"
import whitelogo from "../../assets/svg/icg-logo-white.svg"
import ShowSmall from "../showsmall"

const Header = ({ title, content, menuContent }) => (
  <>
    <ShowSmall className="bg-columbia-blue" size="xl">
      <nav aria-label="Navigation" className="row p-3">
        <SlideMenu title={title} />
        <Link to="/">
          <img src={whitelogo} className="h-10" alt="IGC Logo" />
        </Link>
      </nav>
    </ShowSmall>

    <HideSmall size="xl">
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

      <div className="bg-columbia-blue pt-4">
        <Container>
          <Column isVCentered={true} className="justify-between">
            <Link to="/" className="mr-8">
              {/* <ColumbiaICGWhiteImage style={{ width: `400px` }} /> */}

              <img src={whitelogo} className="h-12" alt="IGC Logo" />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div>
      <div className="bg-columbia-blue pt-4">
        <nav aria-label="Navigation">
          <Container>
            <Column isVCentered={true} className="justify-between">
              <HeaderLinks />

              {menuContent !== null && menuContent}
            </Column>
          </Container>
        </nav>
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
