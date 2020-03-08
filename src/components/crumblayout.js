/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Breadcrumb from "./breadcrumb/breadcrumb"
import Title from "./title"
import Layout from "./layout"
import Container from "./container"

const CrumbLayout = ({
  title,
  titleComponent,
  headerComponent,
  children,
  crumbs,
}) => {
  return (
    <Layout title={title} headerComponent={headerComponent}>
      {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}

      <Container className="min-h-screen mt-4">
        <div className="row items-center justify-between">
          <div>
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
}

export default CrumbLayout
