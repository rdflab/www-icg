import React from "react"
import FooterLinks from "./footerlinks"
import Container from "../container"
import Column from "../column"
import cuimcsvg from "../../assets/svg/cuimc-white.svg"
import crownsvg from "../../assets/svg/crown-white.svg"
import styled from "styled-components"

const StyledFooter = styled.footer`
  background-image: url(${crownsvg});
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: right -4rem top 2rem;
`

const Footer = ({ siteTitle }) => {
  return (
    <StyledFooter className="text-white text-sm mt-8 py-10 bg-blue-columbia">
      <Container>
        <div>
          <FooterLinks />
        </div>

        <div className="mt-16">
          &copy; {new Date().getFullYear()} {siteTitle}
        </div>

        <div className="mt-8">
          <a href="https://cumc.columbia.edu">
            <img src={cuimcsvg} className="h-12" alt="CUIMC Logo" />
          </a>
        </div>
      </Container>
    </StyledFooter>
  )
}

export default Footer
