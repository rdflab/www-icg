/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Breadcrumb from "./breadcrumb/breadcrumbv2"
import Layout from "./layout"
import HideSmall from "./hidesmall"

const CrumbLayout = ({
  title,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  backgroundColor,
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

      <div className={`relative min-h-screen`}>{children}</div>
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
  backgroundColor: "bg-white",
}

export default CrumbLayout
