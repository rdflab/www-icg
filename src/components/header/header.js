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

export const HeaderLinksNav = ({ menuContent }) => (
  <nav aria-label="Navigation">
    <Container>
      <Column className="items-start justify-between">
        <HeaderLinks />

        {menuContent !== null && menuContent}
      </Column>
    </Container>
  </nav>
)

HeaderLinksNav.defaultProps = {
  menuContent: null,
}

export const Header = ({ content, onMenuButtonClick, children }) => (
  <>
    <ShowSmall className="bg-columbia-blue-80" size="lg">
      <nav aria-label="Navigation" className="row p-3">
        <SlideMenuButton onClick={onMenuButtonClick} />

        <Link to="/">
          <img src={whitelogo} className="h-10" alt="ICG Logo" />
        </Link>
      </nav>
    </ShowSmall>

    <HideSmall size="lg">
      {children}

      <div className="bg-columbia-blue-80 py-1">
        <Container>
          <Column className="items-center justify-between ">
            <Link to="/" className="mr-8">
              <img src={whitelogo} className="h-20" alt="ICG Logo" />
            </Link>

            {content !== null && content}
          </Column>
        </Container>
      </div>
    </HideSmall>
  </>
)

Header.defaultProps = {
  content: null,
  onMenuButtonClick: null,
}

const HeaderWithNav = ({ content, menuContent, onMenuButtonClick }) => (
  <Header content={content} onMenuButtonClick={onMenuButtonClick}>
    <div className="w-full py-2 bg-columbia-blue">
      <HeaderLinksNav menuContent={menuContent} />
    </div>
  </Header>
)

HeaderWithNav.defaultProps = {
  content: null,
  menuContent: null,
  onMenuButtonClick: null,
}

export default HeaderWithNav
