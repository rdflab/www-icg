import React from "react"
import { Link } from "gatsby"
import HICCCImage from "../hicccimage"

import footerStyles from "./footer.module.scss"
import FooterLinks from "./footerlinks"

const Footer = props => {
  const { siteTitle } = props
  return (
    <footer className={`footer ${footerStyles.footer}`}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column text-center">
            <FooterLinks />
          </div>
          <div className="column text-center">
            <a href="https://cumc.columbia.edu">
              <HICCCImage />
            </a>
          </div>
          <div className="column text-center">
            &copy; {new Date().getFullYear()} {siteTitle}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer