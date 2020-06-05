import React from "react"
import WhiteLinkExt from "../links/whitelinkext"
import H from "../headings/h"
import ContactInfo from "../people/contactinfo"
import Column from "../column"
import { TitleDiv } from "../headings/h"

const LabWebSite = ({ person }) => {
  if (person.frontmatter.url.length > 0) {
    return (
      <div>
        <h5>
          <WhiteLinkExt to={person.frontmatter.url[1]}>
            {person.frontmatter.url[0]}
          </WhiteLinkExt>
        </h5>
      </div>
    )
  } else {
    return <></>
  }
}

const FacultyHeader = ({ person, title, heading, subHeading, path }) => {
  if (heading === null) {
    heading = `${person.frontmatter.name}, ${person.frontmatter.postNominalLetters}`
  }

  if (subHeading === null) {
    subHeading = `${person.frontmatter.title}`
  }

  return (
    <Column className="text-white">
      <div className="lg:w-8/12 bg-columbia-secondary-blue p-8 md:pl-40">
        <TitleDiv title={title} heading={heading} subHeading={subHeading} />
      </div>

      <div className="lg:w-4/12 bg-columbia-medium-blue p-8 md:pr-40 min-h-full">
        <ContactInfo person={person} color="white" />
      </div>
    </Column>
  )
}

FacultyHeader.defaultProps = {
  title: "Faculty",
  heading: null,
  subHeading: null,
  path: "",
}

export default FacultyHeader
