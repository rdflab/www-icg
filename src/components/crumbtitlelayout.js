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
  path,
  nav,
  title,
  subTitle,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  floatMode,
  bgColorClass,
}) => (
  <CrumbLayout
    title={title}
    headerComponent={headerComponent}
    menuComponent={menuComponent}
    titleComponent={
      <H
        title={nav}
        heading={title}
        subHeading={subTitle}
        path={path}
        className="pb-2"
      />
    }
    crumbs={crumbs}
    floatMode={floatMode}
    bgColorClass={bgColorClass}
  >
    {children}
  </CrumbLayout>
)

CrumbTitleLayout.defaultProps = {
  path: "",
  crumbs: [],
  floatMode: "none",
  selectedTab: "",
  nav: null,
  title: null,
  subTitle: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  bgColorClass: "bg-white",
}

export default CrumbTitleLayout
