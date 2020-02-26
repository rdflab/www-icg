import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/person/sidebarmembers"

const MemberTemplate = props => {
  const { pageContext } = props
  const { person, lab, labPeople } = pageContext

  const title = `${person.firstName} ${person.lastName}`

  return (
    <Layout
      crumbs={[
        ["For Research Scientists", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
        [`${title}`, `/research-areas/faculty-and-staff/${person.id}`],
      ]}
    >
      <SEO title={title} />

      <Title>{title}</Title>

      <Columns>
        <Column></Column>
        <Column w={4}>
          <SideBar>
            <SideBarMembers lab={lab} people={labPeople} />
          </SideBar>
        </Column>
      </Columns>
    </Layout>
  )
}

export default MemberTemplate
