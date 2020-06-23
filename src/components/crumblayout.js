/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import Breadcrumb from "./breadcrumb"
import HideSmall from "./hidesmall"
import HeaderLayout from "./headerlayout"
import HeaderWithNav, { Header, HeaderLinksNav } from "./header/header"
import MenuLayout from "./menulayout"

export const FloatingHeader = ({
  crumbs,
  headerComponent,
  menuComponent,
  onMenuButtonClick,
  children,
}) => (
  <div className={`w-full absolute z-50`}>
    <HeaderWithNav
      content={headerComponent}
      menuComponent={menuComponent}
      onMenuButtonClick={onMenuButtonClick}
    />

    {children}
  </div>
)

FloatingHeader.defaultProps = {
  crumbs: [],
  headerComponent: null,
  menuComponent: null,
  onMenuButtonClick: null,
}

const CrumbLayout = ({
  title,
  headerComponent,
  menuComponent,
  titleComponent,
  children,
  crumbs,
  floatMode,
  bgColorClass,
}) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const onMenuButtonClick = (e) => {
    setMenuVisible(true)
  }

  const onSlideMenuClick = (e) => {
    setMenuVisible(false)
  }

  switch (floatMode) {
    case "header":
      return (
        <MenuLayout
          title={title}
          menuVisible={menuVisible}
          onSlideMenuClick={onSlideMenuClick}
        >
          <FloatingHeader
            crumbs={crumbs}
            headerComponent={headerComponent}
            menuComponent={menuComponent}
            onMenuButtonClick={onMenuButtonClick}
          >
            {titleComponent}

            {crumbs !== null && crumbs.length > 0 && (
              <Breadcrumb crumbs={crumbs} />
            )}
          </FloatingHeader>

          <div className={`relative min-h-screen ${bgColorClass}`}>
            {children}
          </div>
        </MenuLayout>
      )
    case "header-links":
      return (
        <MenuLayout
          title={title}
          menuVisible={menuVisible}
          onSlideMenuClick={onSlideMenuClick}
        >
          <Header
            content={headerComponent}
            menuComponent={menuComponent}
            onMenuButtonClick={onMenuButtonClick}
          />

          <HideSmall className="w-full absolute z-50 shadow-md" size="lg">
            <div className="pt-2 bg-columbia-blue-90">
              <HeaderLinksNav menuComponent={menuComponent} />
            </div>

            {titleComponent}

            {crumbs !== null && crumbs.length > 0 && (
              <Breadcrumb crumbs={crumbs} />
            )}
          </HideSmall>

          <div className={`relative min-h-screen ${bgColorClass}`}>
            {children}
          </div>
        </MenuLayout>
      )
    default:
      return (
        <HeaderLayout
          title={title}
          headerComponent={headerComponent}
          menuComponent={menuComponent}
          bgColorClass={bgColorClass}
        >
          {titleComponent}

          {crumbs !== null && crumbs.length > 0 && (
            <Breadcrumb crumbs={crumbs} />
          )}

          <div className={`relative min-h-screen`}>{children}</div>
        </HeaderLayout>
      )
  }
}

CrumbLayout.defaultProps = {
  crumbs: [],
  floatMode: "none",
  selectedTab: "",
  title: "",
  subTitle: "",
  headerComponent: null,
  menuComponent: null,
  titleComponent: null,
  bgColorClass: "bg-white",
}

export default CrumbLayout
