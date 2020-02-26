/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.scss"
import Helmet from "react-helmet"
import Footer from "./footer"
import Breadcrumb from "./breadcrumb"
import Title from "./title"
import SEO from "./seo"

const Layout = ({ title, children, crumbs, selectedTab }) => {
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
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
      </Helmet>

      {title !== "" && <SEO title={title} />}

      <Header siteTitle={data.site.siteMetadata.title} selected={selectedTab} />

      {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}

      <main>
        <div className="container" style={{ minHeight: "100vh" }}>
          {title !== "" && <Title>{title}</Title>}

          {children}
        </div>
      </main>

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
