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
import BreadcrumbGray from "./breadcrumbgray"

export const FloatingHeader = ({
  crumbs,
  headerContent,
  menuContent,
  onMenuButtonClick,
  children,
}) => (
  <div className={`w-full absolute z-50`}>
    <HeaderWithNav
      content={headerContent}
      menuContent={menuContent}
      onMenuButtonClick={onMenuButtonClick}
    />

    {children}
  </div>
)

FloatingHeader.defaultProps = {
  crumbs: [],
  headerContent: null,
  menuContent: null,
  onMenuButtonClick: null,
}

const CrumbLayout = ({
  title,
  crumbs,
  crumbLocation,
  headerContent,
  menuContent,
  titleContent,
  crumbContent,
  children,
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
            headerContent={headerContent}
            menuContent={menuContent}
            onMenuButtonClick={onMenuButtonClick}
          >
            {titleContent}

            {crumbLocation === "top" &&
              crumbs !== null &&
              crumbs.length > 0 && (
                <Breadcrumb crumbs={crumbs} content={crumbContent} />
              )}
          </FloatingHeader>

          <div className={`relative ${bgColorClass}`}>
            <div className={`relative min-h-screen ${bgColorClass}`}>
              {children}
            </div>
            {crumbLocation === "bottom" && (
              <BreadcrumbGray crumbs={crumbs} content={crumbContent} />
            )}
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
            content={headerContent}
            menuContent={menuContent}
            onMenuButtonClick={onMenuButtonClick}
          />

          <HideSmall className="w-full absolute z-50 shadow-md" size="lg">
            <div className="pt-2 bg-columbia-blue-90">
              <HeaderLinksNav menuContent={menuContent} />
            </div>

            {titleContent}

            {crumbLocation === "top" &&
              crumbs !== null &&
              crumbs.length > 0 && (
                <Breadcrumb crumbs={crumbs} content={crumbContent} />
              )}
          </HideSmall>

          <div className={`${bgColorClass}`}>
            <div className={`relative min-h-screen `}>{children}</div>

            {crumbLocation === "bottom" && (
              <BreadcrumbGray crumbs={crumbs} content={crumbContent} />
            )}
          </div>
        </MenuLayout>
      )
    case "crumb":
      return (
        <HeaderLayout
          title={title}
          headerContent={headerContent}
          menuContent={menuContent}
          bgColorClass={bgColorClass}
        >
          <HideSmall className="w-full absolute z-50 shadow" size="lg">
            {crumbLocation === "top" &&
              crumbs !== null &&
              crumbs.length > 0 && (
                <Breadcrumb crumbs={crumbs} content={crumbContent} />
              )}
          </HideSmall>

          {titleContent}

          <div className={`relative ${bgColorClass}`}>
            <div className={`relative min-h-screen ${bgColorClass}`}>
              {children}
            </div>

            {crumbLocation === "bottom" && (
              <BreadcrumbGray crumbs={crumbs} content={crumbContent} />
            )}
          </div>
        </HeaderLayout>
      )
    default:
      return (
        <HeaderLayout
          title={title}
          headerContent={headerContent}
          menuContent={menuContent}
          bgColorClass={bgColorClass}
        >
          {crumbLocation === "top" && crumbs !== null && crumbs.length > 0 && (
            <Breadcrumb crumbs={crumbs} content={crumbContent} />
          )}

          {titleContent}

          <div className={`relative ${bgColorClass}`}>
            <div className={`relative min-h-screen ${bgColorClass}`}>
              {children}
            </div>

            {crumbLocation === "bottom" && (
              <BreadcrumbGray crumbs={crumbs} content={crumbContent} />
            )}
          </div>
        </HeaderLayout>
      )
  }
}

CrumbLayout.defaultProps = {
  crumbs: [],
  floatMode: "none",
  crumbLocation: "bottom",
  selectedTab: "",
  title: "",
  subTitle: "",
  headerContent: null,
  menuContent: null,
  titleContent: null,
  crumbContent: null,
  bgColorClass: "bg-columbia-light-gray",
}

export default CrumbLayout
