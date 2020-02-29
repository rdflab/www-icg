import React from "react"
import HICCCImage from "../hicccimage"

import footerStyles from "./footer.module.scss"
import FooterLinks from "./footerlinks"
import Container from "../container"
import Column from "../column"
import Columns from "../columns"
import styled from "styled-components"

const StyledFooter = styled.div`
  color: white;
  background: rgba(28, 76, 143, 0.8);
  height: 200px;
  font-size: smaller;
`

const Footer = props => {
  const { siteTitle } = props
  return (
    <StyledFooter className="sm:p-8 md:p-16">
      <Container>
        <Columns>
          <Column w="1/3" className="text-center">
            <FooterLinks />
          </Column>
          <Column w="1/3" className="text-center">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </Column>
          <Column w="1/3" className="text-center">
            &copy; {new Date().getFullYear()} {siteTitle}
          </Column>
        </Columns>
      </Container>
    </StyledFooter>
  )
}

export default Footer
