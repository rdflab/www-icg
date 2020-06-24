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
  crumbs,
  crumbLocation,
  title,
  subTitle,
  headerContent,
  menuContent,
  crumbContent,
  children,

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
      title !== "" ? (
        <div className="pt-8">
          <Container className="border-b border-solid border-gray-400 pb-2">
            <h3 className="text-gray-600">{title}</h3>
          </Container>
        </div>
      ) : null
    }
    crumbs={crumbs}
    crumbLocation={crumbLocation}
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
  crumbLocation: "bottom",
  selectedTab: "",
  nav: null,
  title: "",
  subTitle: "",
  titleContent: null,
  headerContent: null,
  menuContent: null,
  crumbContent: null,
  bgColorClass: "bg-white",
}

export default CrumbTitleLayout
