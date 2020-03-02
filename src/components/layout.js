/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/header"
import Helmet from "react-helmet"
import Footer from "./footer/footer"
import SEO from "./seo"

const Layout = ({ title, children, crumbs }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {title !== "" && <SEO title={title} />}

      <Header siteTitle={data.site.siteMetadata.title} />

      <main>{children}</main>

      <Footer siteTitle={data.site.siteMetadata.title}></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
}

export default Layout
