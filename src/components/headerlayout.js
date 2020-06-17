/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import Layout from "./layout"
import Header from "./header/header"

const HeaderLayout = ({ title, headerComponent, menuComponent, children }) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const onMenuButtonClick = (e) => {
    setMenuVisible(true)
  }

  const onSlideMenuClick = (e) => {
    setMenuVisible(false)
  }

  return (
    <Layout
      title={title}
      menuVisible={menuVisible}
      onSlideMenuClick={onSlideMenuClick}
    >
      <Header
        title={title}
        content={headerComponent}
        menuComponent={menuComponent}
        onMenuButtonClick={onMenuButtonClick}
      />

      <main>{children}</main>
    </Layout>
  )
}

HeaderLayout.defaultProps = {
  title: null,
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  floatHeader: false,
  floatHeaderLinks: false,
}

export default HeaderLayout
