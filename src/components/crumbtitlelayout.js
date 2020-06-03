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
  headerComponent,
  menuComponent,
  children,
  crumbs,
  backgroundColor,
}) => {
  return (
    <CrumbLayout
      title={title}
      headerComponent={headerComponent}
      menuComponent={menuComponent}
      crumbs={crumbs}
      backgroundColor={backgroundColor}
    >
      <H title={nav} heading={title} />
      <div className={`${backgroundColor}`}>{children}</div>
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
  backgroundColor: "bg-white",
}

export default CrumbTitleLayout
