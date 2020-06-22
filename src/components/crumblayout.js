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
  showBreadcrumb,
  children,
}) => (
  <div className={`w-full absolute z-50 shadow-md`}>
    <HeaderWithNav
      content={headerComponent}
      menuComponent={menuComponent}
      onMenuButtonClick={onMenuButtonClick}
    />

    {showBreadcrumb && crumbs.length > 0 && (
      <HideSmall>
        <Breadcrumb crumbs={crumbs} />
      </HideSmall>
    )}

    {children}
  </div>
)

FloatingHeader.defaultProps = {
  crumbs: [],
  headerComponent: null,
  menuComponent: null,
  onMenuButtonClick: null,
  showBreadcrumb: false,
}

const CrumbLayout = ({
  title,
  subTitle,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  headerFloat,
  headerLinksFloat,
  crumbsFloat,
  bgColorClass,
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
          headerComponent={headerComponent}
          menuComponent={menuComponent}
          onMenuButtonClick={onMenuButtonClick}
        />

        <div className={`relative min-h-screen`}>{children}</div>
      </MenuLayout>
    )
  } else {
    if (headerLinksFloat) {
      return (
        <MenuLayout
          title={title}
          menuVisible={menuVisible}
          onSlideMenuClick={onSlideMenuClick}
        >
          <Header
            title={title}
            subTitle={subTitle}
            content={headerComponent}
            menuComponent={menuComponent}
            onMenuButtonClick={onMenuButtonClick}
          />

          <HideSmall className="w-full absolute z-50 shadow-md" size="lg">
            <div className="pt-2 bg-columbia-blue-90">
              <HeaderLinksNav menuComponent={menuComponent} />
            </div>

            <Breadcrumb crumbs={crumbs} />
          </HideSmall>

          <div className={`relative min-h-screen ${bgColorClass}`}>
            {children}
          </div>
        </MenuLayout>
      )
    } else {
      return (
        <HeaderLayout
          title={title}
          headerComponent={headerComponent}
          menuComponent={menuComponent}
        >
          <HideSmall>
            <Breadcrumb
              crumbs={crumbs}
              className={`${crumbsFloat ? "absolute z-50" : ""}`}
            />
          </HideSmall>

          <div className={`relative min-h-screen ${bgColorClass}`}>
            {children}
          </div>
        </HeaderLayout>
      )
    }
  }
}

CrumbLayout.defaultProps = {
  crumbs: [],
  headerFloat: false,
  headerLinksFloat: false,
  crumbsFloat: false,
  selectedTab: "",
  title: "",
  subTitle: "",
  headerComponent: null,
  menuComponent: null,
  bgColorClass: "bg-white",
}

export default CrumbLayout
