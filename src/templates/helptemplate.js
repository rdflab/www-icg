import React, { useState } from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import PeopleGroups from "../components/people/peoplegroups"
import BlueLinkExt from "../components/bluelinkext"
import gatsbysvg from "../assets/svg/Gatsby_logo.svg"
import mariadbsvg from "../assets/svg/maria-db.svg"
import npmsvg from "../assets/svg/npm-logo-black.svg"
import { Link } from "gatsby"
import ExtLink from "../components/extlink"
import Column from "../components/column"
const EMPTY_QUERY = ""

const HelpTemplate = ({ pageContext }) => {
  const { version } = pageContext

  return (
    <CrumbContainerLayout title="Help" crumbs={[["Help", "/help"]]}>
      <div className="text-center">
        {/* <p>Institute for Cancer Genetics website</p> */}
        <p>Version: {version}</p>
        <p>
          &copy; 2020{" "}
          <BlueLinkExt to="mailto:antony@antonyholmes.com">
            Antony Holmes
          </BlueLinkExt>
        </p>
      </div>
      <div className="mt-8 text-center">
        <p className="font-semibold">Built using the following technologies:</p>

        <Column className="w-full mt-8 justify-center items-center">
          <Column className="w-2/10 justify-center">
            <ExtLink to="https://www.npmjs.com/">
              <img src={npmsvg} className="h-8" />
            </ExtLink>
          </Column>
          <Column className="w-2/10 justify-center">
            <ExtLink to="https://www.gatsbyjs.org">
              <img src={gatsbysvg} className="h-8" />
            </ExtLink>
          </Column>
          <Column className="w-2/10 justify-center">
            <ExtLink to="https://mariadb.com/">
              <img src={mariadbsvg} className="h-8" />
            </ExtLink>
          </Column>
          <Column className="w-2/10 justify-center">
            <a href="https://aws.amazon.com/what-is-cloud-computing">
              <img
                src="https://d0.awsstatic.com/logos/powered-by-aws.png"
                alt="Powered by AWS Cloud Computing"
                className="h-8"
              />
            </a>
          </Column>
        </Column>
      </div>
    </CrumbContainerLayout>
  )
}

export default HelpTemplate
