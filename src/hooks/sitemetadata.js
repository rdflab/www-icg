import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            facultyGroups
            paths {
              adminPath
              researchAreasPath
              publicationsPath
              peoplePath
              newsPath
              labsPath
              facultyStaffPath
              facultyPath
              eventsPath
              adminStaffPath
            }
          }
        }
      }
    `
  )

  return site.siteMetadata
}

export default useSiteMetadata
