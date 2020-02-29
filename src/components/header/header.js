import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "../columbiaicgimage"
import ColumbiaICGWhiteImage from "../columbiaicgwhiteimage"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"

const StyledHeader = styled.header`
  color: rgba(29, 79, 145, 0.8);
  //background-color: rgba(29, 79, 145, 0.1);
  //padding-top: 0.5rem;
  //padding-bottom: 0.5rem;
  padding: 0;
  margin: 0;
  padding-top: 1rem;
`

const StyledMobileHeader = styled(StyledHeader)`
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-bottom: solid 1px lightgray;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  margin-bottom: 2rem;
  background: rgba(29, 79, 145, 0.8);
  color: white;
`

const Header = ({ siteTitle }) => (
  <>
    <StyledMobileHeader className="sm:hidden flex flex-row self-center px-3">
      <SlideMenu />
      <Link to="/" style={{ borderBottom: "none" }}>
        <ColumbiaICGWhiteImage style={{ width: `300px` }} />
      </Link>
    </StyledMobileHeader>

    <StyledHeader className="hidden sm:block flex flex-row">
      <Container className="flex-col">
        <div className="flex flex-row self-center">
          <Link to="/" style={{ borderBottom: "none" }}>
            <ColumbiaICGImage style={{ width: `400px` }} />
          </Link>
        </div>
        <HeaderLinks />
      </Container>
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
