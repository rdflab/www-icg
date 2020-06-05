import { useStaticQuery, graphql } from "gatsby"

const useCurrentBuild = () => {
  const { currentBuildDate } = useStaticQuery(
    graphql`
      query {
        currentBuildDate {
          currentDate
        }
      }
    `
  )

  return currentBuildDate.currentDate
}

export default useCurrentBuild
