import React from "react"

const Footer = props => {
  return (
      <footer>
        &copy; {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
  )
}

export default Footer
