import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const MemberTemplate = props => {
  const { data, pageContext } = props
  const { person } = pageContext
 
  const title = `${person.firstName} ${person.lastName}`

  return (
    <Layout crumbs={[
      ["For Research Scientists", "/research-areas"],
      ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      [
        `${title}`,
        `/research-areas/faculty-and-staff/${person.id}`,
      ],
    ]}>
      <SEO title={title} />

      <h1>{title}</h1>
    </Layout>
  )
}

export default MemberTemplate
