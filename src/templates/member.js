import React from "react"
import Layout from "../components/layout"
import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import H4 from "../components/headings/h4"

const MemberTemplate = props => {
  const { pageContext } = props
  const { person, lab, labPeople } = pageContext

  const title = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  return (
    <Layout
      crumbs={[
        ["For Research Scientists", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
        [
          `${title}`,
          `/research-areas/faculty-and-staff/${person.frontmatter.id}`,
        ],
      ]}
      title={title}
    >
      <H4>{person.frontmatter.titles[0]}</H4>

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
