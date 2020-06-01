import React from "react"
import { graphql } from "gatsby"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLinkExt from "../components/bluelinkext"
import gatsbysvg from "../assets/svg/Gatsby_logo.svg"
import mariadbsvg from "../assets/svg/maria-db.svg"
import npmsvg from "../assets/svg/npm-logo-black.svg"
import ExtLink from "../components/extlink"
import Column from "../components/column"
import Container from "../components/container"

const HelpTemplate = ({ pageContext, data }) => {
  return (
    <CrumbTitleLayout
      nav="Help"
      title="Web Site Information"
      crumbs={[["Help", "/help"]]}
    >
      <Container className="py-8">
        <div>
          {/* <p>Institute for Cancer Genetics website</p> */}
          <p>Last updated: {data.currentBuildDate.currentDate}</p>
          <p className="mt-4">
            &copy; 2020-{new Date().getFullYear()}{" "}
            <BlueLinkExt to="mailto:antony@antonyholmes.com">
              Antony Holmes
            </BlueLinkExt>
          </p>
        </div>
        <div className="mt-16">
          <p className="font-semibold">
            Built using the following technologies:
          </p>

          <Column className="w-full mt-8 justify-between items-center">
            <Column className="w-2/10">
              <ExtLink to="https://www.npmjs.com/">
                <img src={npmsvg} className="h-8 help-logo" alt="NPM logo" />
              </ExtLink>
            </Column>
            <Column className="w-2/10">
              <ExtLink to="https://www.gatsbyjs.org">
                <img
                  src={gatsbysvg}
                  className="h-8 help-logo"
                  alt="Gatsby logo"
                />
              </ExtLink>
            </Column>
            <Column className="w-2/10">
              <ExtLink to="https://mariadb.com/">
                <img
                  src={mariadbsvg}
                  className="h-8 help-logo"
                  alt="MariaDB logo"
                />
              </ExtLink>
            </Column>
            <Column className="w-2/10">
              <a href="https://aws.amazon.com/what-is-cloud-computing">
                <img
                  src="https://d0.awsstatic.com/logos/powered-by-aws.png"
                  alt="Powered by AWS Cloud Computing"
                  className="h-8 help-logo"
                />
              </a>
            </Column>
          </Column>
        </div>
      </Container>
    </CrumbTitleLayout>
  )
}

export const query = graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`

export default HelpTemplate
