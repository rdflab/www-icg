/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Breadcrumb from "./breadcrumb/breadcrumbv2"
import Title from "./title"
import Layout from "./layout"
import Container from "./container"

const CrumbLayout = ({
  title,
  titleComponent,
  headerComponent,
  menuComponent,
  children,
  crumbs,
}) => {
  return (
    <Layout
      title={title}
      headerComponent={headerComponent}
      menuComponent={menuComponent}
    >
      {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}

      <Container className="min-h-screen mt-4">
        <div className="row items-center justify-between mb-4">
          <div className="mr-8">
            <Title>{title}</Title>
          </div>
          {titleComponent !== null ? titleComponent : ""}
        </div>
        {children}
      </Container>
    </Layout>
  )
}

CrumbLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
}

export default CrumbLayout
