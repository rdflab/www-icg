/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Breadcrumb from "./breadcrumb/breadcrumbv2"
import HideSmall from "./hidesmall"
import HeaderLayout from "./headerlayout"
import Layout from "./layout"
import Header from "./header/header"
import Container from "./container"
import Column from "./column"
import whitelogo from "../assets/svg/icg-logo-white.svg"
import { Link } from "gatsby"
import ShowSmall from "./showsmall"
import HeaderLinks from "./header/headerlinks"
import SlideMenu from "./slidemenu/slidemenu"

const CrumbLayout = ({
  title,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  headerFloat,
  headerLinksFloat,
  crumbsFloat,
  backgroundColor,
}) => {
  if (headerFloat) {
    return (
      <Layout title={title}>
        <div className={`w-full absolute z-50`}>
          <Header
            title={title}
            content={headerComponent}
            menuContent={menuComponent}
          />
          {crumbs.length > 0 && (
            <HideSmall size="lg">
              <Breadcrumb crumbs={crumbs} />
            </HideSmall>
          )}
        </div>

        <div className={`relative min-h-screen ${backgroundColor}`}>
          {children}
        </div>
      </Layout>
    )
  } else {
    if (headerLinksFloat) {
      return (
        <Layout title={title}>
          <ShowSmall className="bg-columbia-blue-90" size="lg">
            <nav aria-label="Navigation" className="row p-3">
              <SlideMenu title={title} />
              <Link to="/">
                <img src={whitelogo} className="h-10" alt="IGC Logo" />
              </Link>
            </nav>
          </ShowSmall>

          <HideSmall size="lg" className="bg-columbia-blue-90">
            <div className="pt-1">
              <Container>
                <Column className="items-center justify-between">
                  <Link to="/" className="mr-8">
                    {/* <ColumbiaICGWhiteImage style={{ width: `400px` }} /> */}

                    <img src={whitelogo} className="h-20" alt="IGC Logo" />
                  </Link>

                  {headerComponent !== null && headerComponent}
                </Column>
              </Container>
            </div>
          </HideSmall>

          <HideSmall className="w-full absolute z-50" size="lg">
            <div className="pt-2 bg-columbia-blue-90">
              <nav aria-label="Navigation">
                <Container>
                  <Column className="items-center justify-between">
                    <HeaderLinks />

                    {menuComponent !== null && menuComponent}
                  </Column>
                </Container>
              </nav>
            </div>

            {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
          </HideSmall>

          <div className={`relative min-h-screen ${backgroundColor}`}>
            {children}
          </div>
        </Layout>
      )
    } else {
      return (
        <HeaderLayout
          title={title}
          headerComponent={headerComponent}
          menuComponent={menuComponent}
        >
          {crumbs.length > 0 && (
            <HideSmall>
              <Breadcrumb
                crumbs={crumbs}
                className={`${crumbsFloat ? "absolute z-50" : ""}`}
              />
            </HideSmall>
          )}

          <div className={`relative min-h-screen ${backgroundColor}`}>
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
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  backgroundColor: "bg-white",
}

export default CrumbLayout
