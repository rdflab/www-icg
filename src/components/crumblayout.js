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

const CrumbLayout = ({ title, children, crumbs }) => {
  return (
    <Layout title={title}>
      {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}

      <Container style={{ minHeight: "100vh" }}>
        {title !== "" && <Title>{title}</Title>}

        {children}
      </Container>
    </Layout>
  )
}

CrumbLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
}

export default CrumbLayout
