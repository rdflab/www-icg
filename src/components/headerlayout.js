/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import Layout from "./layout"
import HeaderWithNav from "./header/header"
import MenuLayout from "./menulayout"

const HeaderLayout = ({
  title,
  headerComponent,
  menuComponent,
  bgColorClass,
  children,
}) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const onMenuButtonClick = (e) => {
    setMenuVisible(true)
  }

  const onSlideMenuClick = (e) => {
    setMenuVisible(false)
  }

  return (
    <MenuLayout
      title={title}
      menuVisible={menuVisible}
      onSlideMenuClick={onSlideMenuClick}
    >
      <HeaderWithNav
        title={title}
        content={headerComponent}
        menuComponent={menuComponent}
        onMenuButtonClick={onMenuButtonClick}
      />

      <div className={`${bgColorClass}`}>
        <main>{children}</main>
      </div>
    </MenuLayout>
  )
}

HeaderLayout.defaultProps = {
  title: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  floatHeader: false,
  floatHeaderLinks: false,
  bgColorClass: "bg-white",
}

export default HeaderLayout
