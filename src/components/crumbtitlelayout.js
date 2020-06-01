/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import CrumbLayout from "./crumblayout"
import H from "./headings/h"

const CrumbTitleLayout = ({
  nav,
  title,
  titleComponent,
  headerComponent,
  menuComponent,
  children,
  crumbs,
}) => {
  return (
    <CrumbLayout
      title={title}
      headerComponent={headerComponent}
      menuComponent={menuComponent}
      crumbs={crumbs}
    >
      <H title={nav} heading={title} />
      {children}
    </CrumbLayout>
  )
}

CrumbTitleLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  nav: null,
  title: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
}

export default CrumbTitleLayout
