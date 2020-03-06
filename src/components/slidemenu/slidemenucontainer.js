import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flattenEdges from "../../utils/flattenedges"
import SlideMenuLink from "./slidemenulink"
import SlideMenuCloseButton from "./slidemenuclosebutton"
import ColumbiaICGWhiteImage from "../images/columbiaicgwhiteimage"

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
      className={`slide-menu-container-2 ${
        visible ? "slide-menu-container-2-visible" : ""
      }`}
      onClick={onClickHandle}
    >
      <div
        className={`fixed col shadow-xl rounded-lg bg-white overflow-hidden`}
        style={{
          margin: 0,
          padding: 0,
          top: "50vh",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          height: "95vh",
        }}
      >
        <div className="row items-center justify-between p-4 bg-blue-columbia-80 w-full">
          <div></div>
          <div>
            <ColumbiaICGWhiteImage style={{ width: `200px` }} />
          </div>
          <div className="text-right">
            <SlideMenuCloseButton />
          </div>
        </div>
        <div>
          {links.map((link, index) => {
            return (
              <div key={index}>
                <SlideMenuLink key={index} to={link.link}>
                  {link.name}
                </SlideMenuLink>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SlideMenuContainer
