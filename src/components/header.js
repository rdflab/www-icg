import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "./columbiaicgimage"

const StyledHeader = styled.header`
  color: rgba(29, 79, 145, 0.8);
  //background-color: rgba(29, 79, 145, 0.1);
  //padding-top: 0.5rem;
  //padding-bottom: 0.5rem;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <div className="container">
      <div className="navbar-start">
        <Link to="/" style={{ borderBottom: "none" }}>
          <ColumbiaICGImage style={{ width: `400px` }} />
        </Link>
      </div>
      <HeaderLinks />
    </div>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
