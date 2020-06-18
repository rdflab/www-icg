import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
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

export const Header = ({ content, onMenuButtonClick, children }) => (
  <>
    <ShowSmall className="bg-columbia-blue-90" size="lg">
      <nav aria-label="Navigation" className="row p-3">
        <SlideMenuButton onClick={onMenuButtonClick} />

        <Link to="/">
          <img src={whitelogo} className="h-10" alt="ICG Logo" />
        </Link>
      </nav>
    </ShowSmall>

    <HideSmall className="bg-columbia-blue-90" size="lg">
      <div className="pt-1">
        <Container>
          <Column className="items-center justify-between">
            <Link to="/" className="mr-8">
              <img src={whitelogo} className="h-20" alt="ICG Logo" />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div>

      {children}
    </HideSmall>
  </>
)

Header.defaultProps = {
  content: null,
  onMenuButtonClick: null,
}

const HeaderWithNav = ({ content, menuComponent, onMenuButtonClick }) => (
  <Header content={content} onMenuButtonClick={onMenuButtonClick}>
    <div className="w-full pt-2">
      <HeaderLinksNav menuComponent={menuComponent} />
    </div>
  </Header>
)

HeaderWithNav.defaultProps = {
  content: null,
  menuContent: null,
  onMenuButtonClick: null,
}

export default HeaderWithNav
