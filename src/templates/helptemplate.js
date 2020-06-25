import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLinkExt from "../components/links/bluelinkext"
import gatsbysvg from "../assets/svg/Gatsby_logo.svg"
import mariadbsvg from "../assets/svg/maria-db.svg"
import npmsvg from "../assets/svg/npm-logo-black.svg"
import LinkExt from "../components/links/linkext"
import Column from "../components/column"
import SmallContainer from "../components/smallcontainer"
import useSiteMetadata from "../hooks/sitemetadata"
import useCurrentBuild from "../hooks/currentbuild"
import SiteSearch from "../components/search/sitesearch"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"
import Card from "../components/card"
import Container from "../components/container"

// nav="Help"

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
      crumbs={[["Help", "/help"]]}
      title={`About ${title} Web Site`}
      headerContent={<SiteSearch />}
      bgColorClass="bg-columbia-light-gray"
    >
      <FlHdDiv className="min-h-full">
        <Container>
          <Card className="p-8">
            {/* <p>Institute for Cancer Genetics website</p> */}
            <p>Last updated: {currentDate}</p>
            <p className="mt-4">
              Proudly Developed By{" "}
              <BlueLinkExt to="mailto:antony@antonyholmes.com">
                Antony Holmes
              </BlueLinkExt>
            </p>
            <p className="mt-4">&copy; {copyright} Antony Holmes</p>
          </Card>

          <div className="pt-32 pb-64">
            <p className="font-semibold">
              Built using the following technologies:
            </p>

            <Column className="w-full mt-8 justify-between items-center">
              <Column className="w-full md:w-2/10 py-4">
                <LinkExt to="https://www.npmjs.com/">
                  <img src={npmsvg} className="h-8 help-logo" alt="NPM logo" />
                </LinkExt>
              </Column>
              <Column className="w-full md:w-2/10 py-4">
                <LinkExt to="https://www.gatsbyjs.org">
                  <img
                    src={gatsbysvg}
                    className="h-8 help-logo"
                    alt="Gatsby logo"
                  />
                </LinkExt>
              </Column>
              <Column className="w-full md:w-2/10 py-4">
                <LinkExt to="https://mariadb.com/">
                  <img
                    src={mariadbsvg}
                    className="h-8 help-logo"
                    alt="MariaDB logo"
                  />
                </LinkExt>
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
      </FlHdDiv>
    </CrumbTitleLayout>
  )
}

export default HelpTemplate
