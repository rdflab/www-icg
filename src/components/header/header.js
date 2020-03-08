import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderLinks from "./headerlinks"
import ColumbiaICGImage from "../images/columbiaicgimage"
import ColumbiaICGWhiteImage from "../images/columbiaicgwhiteimage"
import SlideMenu from "../slidemenu/slidemenu"
import Container from "../container"
import Row from "../row"
import HideSmall from "../hidesmall"

const Header = ({ title, content }) => (
  <>
    <nav
      aria-label="Navigation"
      className="row text-white p-3 bg-blue-columbia-80 sm:hidden"
    >
      <SlideMenu title={title} />
      <Link to="/">
        <ColumbiaICGWhiteImage style={{ width: `300px` }} />
      </Link>
    </nav>

    <HideSmall>
      <div className="p-3">
        <Container>
          <Row className="justify-between items-center">
            <Link to="/" className="mr-8">
              <ColumbiaICGImage style={{ width: `400px` }} />
            </Link>

            {content !== null && content}
          </Row>
        </Container>
      </div>

      <nav aria-label="Navigation" className="bg-blue-columbia-80 py-3">
        <Container>
          <Row className="items-center">
            <HeaderLinks />
          </Row>
        </Container>
      </nav>
    </HideSmall>
  </>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: "",
  content: null,
}

export default Header
