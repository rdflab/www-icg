/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import H from "./headings/h"
import HideSmall from "./hidesmall"
import Breadcrumb from "./breadcrumb"
import Layout from "./layout"
import HeaderLayout from "./headerlayout"
import Header from "./header/header"

const CrumbTitleLayout = ({
  path,
  nav,
  title,
  subTitle,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  headerFloat,
  crumbsFloat,
  backgroundColor,
}) => {
  if (headerFloat) {
    return (
      <Layout title={title}>
        <div className={`w-full absolute z-50`}>
          <Header
            title={title}
            subTitle={subTitle}
            content={headerComponent}
            menuComponent={menuComponent}
          />
          {crumbs.length > 0 && (
            <HideSmall>
              <Breadcrumb crumbs={crumbs} />
            </HideSmall>
          )}
          <H title={nav} heading={title} subHeading={subTitle} path={path} />
        </div>

        <div className={`relative min-h-screen ${backgroundColor}`}>
          {children}
        </div>
      </Layout>
    )
  } else {
    return (
      <HeaderLayout
        title={title}
        subTitle={subTitle}
        headerComponent={headerComponent}
        menuComponent={menuComponent}
      >
        <div
          className={`w-full shadow-md ${crumbsFloat ? "absolute z-50" : ""}`}
        >
          {crumbs.length > 0 && (
            <HideSmall>
              <Breadcrumb crumbs={crumbs} />
            </HideSmall>
          )}
          <H title={nav} heading={title} subHeading={subTitle} path={path} />
        </div>

        <div className={`relative min-h-screen ${backgroundColor}`}>
          {children}
        </div>
      </HeaderLayout>
    )
  }
}
//   return (
//     <CrumbLayout
//       title={title}
//       headerComponent={headerComponent}
//       menuComponent={menuComponent}
//       crumbs={crumbs}
//       crumbsFloat={crumbsFloat}
//       backgroundColor={backgroundColor}
//     >
//       <H title={nav} heading={title} path={path} />
//       <div className={`${backgroundColor}`}>{children}</div>
//     </CrumbLayout>
//   )
// }

CrumbTitleLayout.defaultProps = {
  path: "",
  crumbs: [],
  headerFloat: false,
  crumbsFloat: false,
  selectedTab: "",
  nav: null,
  title: null,
  subTitle: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  backgroundColor: "bg-white",
}

export default CrumbTitleLayout
