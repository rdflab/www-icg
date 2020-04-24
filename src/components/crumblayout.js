/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Breadcrumb from "./breadcrumb/breadcrumb"
import Title from "./title"
import Layout from "./layout"
import Container from "./container"
import HideSmall from "./hidesmall"

const CrumbLayout = ({
  title,
  titleComponent,
  headerComponent,
  menuComponent,
  children,
  crumbs,
}) => {
  return (
    <Layout
      title={title}
      headerComponent={headerComponent}
      menuComponent={menuComponent}
    >
      {crumbs.length > 0 && (
        <HideSmall>
          <Breadcrumb crumbs={crumbs} />
        </HideSmall>
      )}
      <div className="min-h-screen">{children}</div>
    </Layout>
  )
}

CrumbLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
}

export default CrumbLayout
