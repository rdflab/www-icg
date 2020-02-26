import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "./columbiaicgimage"
import SlideMenu from "./slidemenu"

const StyledMobileHeader = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`

const StyledHeader = styled.header`
  color: rgba(29, 79, 145, 0.8);
  //background-color: rgba(29, 79, 145, 0.1);
  //padding-top: 0.5rem;
  //padding-bottom: 0.5rem;
  padding: 0;
  margin: 0;
  padding-top: 1rem;
`

const Header = ({ siteTitle }) => (
  <>
    <StyledMobileHeader className="is-hidden-tablet">
      <div className="container level is-mobile is-hidden-tablet">
        <div className="level-left">
          <div className="level-item">
            <SlideMenu />
          </div>
          <div className="level-item">
            <Link to="/" style={{ borderBottom: "none" }}>
              <ColumbiaICGImage style={{ width: `300px` }} />
            </Link>
          </div>
        </div>
      </div>
    </StyledMobileHeader>

    <StyledHeader className="is-hidden-mobile">
      <div className="container">
        <div className="navbar-start">
          <Link to="/" style={{ borderBottom: "none" }}>
            <ColumbiaICGImage style={{ width: `400px` }} />
          </Link>
        </div>
        <HeaderLinks />
      </div>
    </StyledHeader>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
