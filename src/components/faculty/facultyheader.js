import React from "react"
import ContactInfo from "../people/contactinfo"
import Column from "../column"
import { TitleDiv } from "../headings/h"
import getContextName from "../../utils/contextname"

// const LabWebSite = ({ person }) => {
//   if (person.frontmatter.url.length > 0) {
//     return (
//       <div>
//         <h5>
//           <WhiteLinkExt to={person.frontmatter.url[1]}>
//             {person.frontmatter.url[0]}
//           </WhiteLinkExt>
//         </h5>
//       </div>
//     )
//   } else {
//     return <></>
//   }
// }

const FacultyHeader = ({ person, title, heading, subHeading, path }) => {
  if (heading === null) {
    heading = `${person.frontmatter.name}, ${person.frontmatter.postNominalLetters}`
  }

  if (subHeading === null) {
    subHeading = getContextName("people", person.titleMap) //`${person.frontmatter.title}`
  }

  return (
    <Column className="text-white">
      <div className="w-full md:w-5/10 lg:w-6/10 2xl:w-12/20 bg-columbia-secondary-blue p-8 md:pl-20 xl:pl-32 2xl:pl-40 3xl:pl-56">
        <TitleDiv title={title} heading={heading} subHeading={subHeading} />
      </div>

      <div className="w-full md:w-5/10 lg:w-4/10 2xl:w-8/20 bg-columbia-medium-blue p-8 md:pr-20 xl:pr-32 2xl:pr-40 3xl:pr-56 min-h-full text-xl">
        <h5 className="uppercase font-light">Contact</h5>

        <div className="tracking-wide mt-2">
          <ContactInfo person={person} color="white" showIcons={false} />
        </div>
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
