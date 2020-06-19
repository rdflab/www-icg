/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Layout from "./layout"
import SlideMenu from "../components/slidemenu/slidemenu"

const MenuLayout = ({ title, children, menuVisible, onSlideMenuClick }) => {
  return (
    <Layout title={title}>
      <SlideMenu visible={menuVisible} onSlideMenuClick={onSlideMenuClick} />

      {children}
    </Layout>
  )
}

MenuLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
  menuVisible: false,
  onSlideMenuClick: null,
}

export default MenuLayout
