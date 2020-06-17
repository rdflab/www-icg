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
import SlideMenuButton from "../slidemenu/slidemenubutton"

export const HeaderLinksNav = ({ menuComponent }) => (
  <nav aria-label="Navigation">
    <Container>
      <Column className="items-start justify-between">
        <HeaderLinks />

        {menuComponent !== null && menuComponent}
      </Column>
    </Container>
  </nav>
)

HeaderLinksNav.defaultProps = {
  menuComponent: null,
}

const Header = ({ title, content, menuComponent, onMenuButtonClick }) => (
  <>
    <ShowSmall className="bg-columbia-blue-90" size="lg">
      <nav aria-label="Navigation" className="row p-3">
        {/* <SlideMenu title={title} /> */}

        <SlideMenuButton onClick={onMenuButtonClick} />

        <Link to="/">
          <img src={whitelogo} className="h-10" alt="IGC Logo" />
        </Link>
      </nav>
    </ShowSmall>

    <HideSmall size="lg" className="bg-columbia-blue-90 shadow-md">
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

      <div className="pt-1">
        <Container>
          <Column className="items-center justify-between">
            <Link to="/" className="mr-8">
              {/* <ColumbiaICGWhiteImage style={{ width: `400px` }} /> */}

              <img src={whitelogo} className="h-20" alt="IGC Logo" />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div>
      <div className="pt-2 pb-4">
        <HeaderLinksNav menuComponent={menuComponent} />
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
  onMenuButtonClick: null,
}

export default Header
