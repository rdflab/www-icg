import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import SlideMenuLink from "./slidemenulink"
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
      className={`slide-menu-container ${
        visible ? "slide-menu-container-visible" : ""
      }`}
      onClick={onClickHandle}
    >
      <div className="menu-column">
        {links.map((link, index) => {
          return (
            <SlideMenuLink key={index} to={link.link}>
              {link.name}
            </SlideMenuLink>
          )
        })}
      </div>
      <SlideMenuCloseButton />
    </div>
  )
}

export default SlideMenuContainer
