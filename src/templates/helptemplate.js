import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLinkExt from "../components/links/bluelinkext"
import gatsbysvg from "../assets/svg/Gatsby_logo.svg"
import mariadbsvg from "../assets/svg/maria-db.svg"
import npmsvg from "../assets/svg/npm-logo-black.svg"
import ExtLink from "../components/links/extlink"
import Column from "../components/column"
import Container from "../components/container"
import useSiteMetadata from "../hooks/sitemetadata"
import useCurrentBuild from "../hooks/currentbuild"
import SiteSearch from "../components/search/sitesearch"

const HelpTemplate = ({ path, pageContext, data }) => {
  const { title } = useSiteMetadata()
  const { currentDate } = useCurrentBuild()

  const year = new Date().getFullYear()

  let copyright

  if (year > 2020) {
    copyright = `2020-${year}`
  } else {
    copyright = "2020"
  }

  return (
    <CrumbTitleLayout
      path={path}
      nav="Help"
      title={`About ${title} Web Site`}
      crumbs={[["Help", "/help"]]}
      headerComponent={<SiteSearch />}
    >
      <div className="bg-columbia-light-gray py-16 min-h-full">
        <Container>
          <div className="bg-white rounded-md shadow-lg hover:shadow-xl trans-ani p-12 md:w-1/2">
            {/* <p>Institute for Cancer Genetics website</p> */}
            <p>Last updated: {currentDate}</p>
            <p className="mt-4">
              Proudly developed by{" "}
              <BlueLinkExt to="mailto:antony@antonyholmes.com">
                Antony Holmes
              </BlueLinkExt>
            </p>
            <p className="mt-4">&copy; {copyright} Antony Holmes</p>
          </div>

          <div className="pt-32 pb-64">
            <p className="font-semibold">
              Built using the following technologies:
            </p>

            <Column className="w-full mt-8 justify-between items-center">
              <Column className="w-full md:w-2/10 py-4">
                <ExtLink to="https://www.npmjs.com/">
                  <img src={npmsvg} className="h-8 help-logo" alt="NPM logo" />
                </ExtLink>
              </Column>
              <Column className="w-full md:w-2/10 py-4">
                <ExtLink to="https://www.gatsbyjs.org">
                  <img
                    src={gatsbysvg}
                    className="h-8 help-logo"
                    alt="Gatsby logo"
                  />
                </ExtLink>
              </Column>
              <Column className="w-full md:w-2/10 py-4">
                <ExtLink to="https://mariadb.com/">
                  <img
                    src={mariadbsvg}
                    className="h-8 help-logo"
                    alt="MariaDB logo"
                  />
                </ExtLink>
              </Column>
              <Column className="w-full md:w-2/10 py-4">
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
      </div>
    </CrumbTitleLayout>
  )
}

export default HelpTemplate
