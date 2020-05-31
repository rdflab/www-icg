/**
 * CrumbLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Container from "./container"
import CrumbLayout from "./crumblayout"

const CrumbContainerLayout = ({
  title,
  titleComponent,
  headerComponent,
  menuComponent,
  children,
  crumbs,
  backgroundColor,
}) => {
  return (
    <CrumbLayout
      title={title}
      headerComponent={headerComponent}
      menuComponent={menuComponent}
      crumbs={crumbs}
    >
      <div className={`${backgroundColor}`}>
        <Container className="min-h-screen">
          <div className="row items-center justify-between mb-4">
            {/* {title !== "" && (
            <div className="mr-8">
              <Title>{title}</Title>
            </div>
          )} */}
            <div></div>
            {titleComponent !== null ? titleComponent : ""}
          </div>
          {children}
        </Container>
      </div>
    </CrumbLayout>
  )
}

CrumbContainerLayout.defaultProps = {
  crumbs: [],
  selectedTab: "",
  title: "",
  titleComponent: null,
  headerComponent: null,
  menuComponent: null,
  backgroundColor: "bg-white",
}

export default CrumbContainerLayout
