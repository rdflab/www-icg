/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import H from "./headings/h"
import HideSmall from "./hidesmall"
import Breadcrumb from "./breadcrumb"
import HeaderLayout from "./headerlayout"
import { FloatingHeader } from "./crumblayout"
import MenuLayout from "./menulayout"

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
  const [menuVisible, setMenuVisible] = useState(false)

  const onMenuButtonClick = (e) => {
    setMenuVisible(true)
  }

  const onSlideMenuClick = (e) => {
    setMenuVisible(false)
  }

  if (headerFloat) {
    return (
      <MenuLayout
        title={title}
        menuVisible={menuVisible}
        onSlideMenuClick={onSlideMenuClick}
      >
        <FloatingHeader
          crumbs={crumbs}
          title={title}
          subTitle={subTitle}
          headerComponent={headerComponent}
          menuComponent={menuComponent}
          onMenuButtonClick={onMenuButtonClick}
        >
          <H title={nav} heading={title} subHeading={subTitle} path={path} />
        </FloatingHeader>

        <div className={`relative min-h-screen ${backgroundColor}`}>
          {children}
        </div>
      </MenuLayout>
    )
  } else {
    return (
      <HeaderLayout
        title={title}
        subTitle={subTitle}
        headerComponent={headerComponent}
        menuComponent={menuComponent}
        backgroundColor={backgroundColor}
      >
        <div
          className={`w-full shadow-md ${crumbsFloat ? "absolute z-50" : ""}`}
        >
          <HideSmall>
            <Breadcrumb crumbs={crumbs} />
          </HideSmall>

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
