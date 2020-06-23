/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import CrumbLayout from "./crumblayout"
import H from "./headings/h"
import Container from "./container"

const CrumbTitleLayout = ({
  path,
  nav,
  title,
  subTitle,
  headerContent,
  menuContent,
  crumbContent,
  children,
  crumbs,
  floatMode,
  bgColorClass,
}) => (
  <CrumbLayout
    title={title}
    headerContent={headerContent}
    menuContent={menuContent}
    crumbContent={crumbContent}
    // titleContent={
    //   <H
    //     title={nav}
    //     heading={title}
    //     subHeading={subTitle}
    //     path={path}
    //     className="py-2"
    //   />
    // }
    titleContent={
      <div className="py-3 bg-columbia-blue-80">
        <Container>
          <h1 className="text-white-95">{title}</h1>
        </Container>
      </div>
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
  titleContent: null,
  headerContent: null,
  menuContent: null,
  crumbContent: null,
  bgColorClass: "bg-white",
}

export default CrumbTitleLayout
