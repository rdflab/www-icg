import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import slideMenuContainerStyles from "./slidemenucontainer.module.scss"
import flattenEdges from "../utils/flattenedges"
import BodyLink from "./bodylink"
import SlideMenuCloseButton from "./slidemenuclosebutton"

// const StyledDiv = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   transform: translate3d(-100vw, 0, 0);
//   transition: transform .5s
//   width: 100vw;
//   height: 100vh;
//   background: rba(0, 0, 0, 0.7);
// `

const MenuColumn = styled.div`
  margin: 0;
  padding: 1rem;
  background: white;
  height: 100vh;
  width: 80vw;
  float: left;
`

const SlideMenuContainer = ({ onClickHandle, visible }) => {
  const data = useStaticQuery(graphql`
    query {
      links: allSlidemenulinksJson {
        edges {
          node {
            name
            link
          }
        }
      }
    }
  `)

  const links = flattenEdges(data.links.edges)

  return (
    <div
      className={`${slideMenuContainerStyles.slideMenuContainer} ${
        visible ? slideMenuContainerStyles.slideMenuContainerVisible : ""
      }`}
      onClick={onClickHandle}
    >
      <MenuColumn>
        {links.map((link, index) => {
          return (
            <div>
              <BodyLink key={index} to={link.link}>
                {link.name}
              </BodyLink>
            </div>
          )
        })}
      </MenuColumn>
      <SlideMenuCloseButton />
    </div>
  )
}

export default SlideMenuContainer
