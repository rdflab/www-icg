import React from "react"
import FooterLinks from "./footerlinks"
import Container from "../container"
import Column from "../column"
import cuimcsvg from "../../assets/svg/cuimc-white.svg"

const Footer = ({ siteTitle }) => {
  return (
    <footer className="text-white text-sm mt-8 py-8 bg-blue-columbia-80">
      <Container>
        <Column isVCentered={true}>
          <Column w="6" className="mb-8 justify-center md:justify-start">
            <FooterLinks />
          </Column>
          <Column w="6" className="mb-8 justify-center md:justify-end">
            <div>
              &copy; {new Date().getFullYear()} {siteTitle}
            </div>
          </Column>
        </Column>

        <div className="row items-center justify-center md:justify-start">
          <a href="https://cumc.columbia.edu">
            <img src={cuimcsvg} className="h-10" alt="CUIMC Logo" />
          </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
