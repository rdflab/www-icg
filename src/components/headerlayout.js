/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Layout from "./layout"
import Header from "./header/header"

const HeaderLayout = ({ title, headerComponent, menuComponent, children }) => (
  <Layout title={title}>
    <Header
      title={title}
      content={headerComponent}
      menuComponent={menuComponent}
    />

    <main>{children}</main>
  </Layout>
)

HeaderLayout.defaultProps = {
  title: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  floatHeader: false,
  floatHeaderLinks: false,
}

export default HeaderLayout
