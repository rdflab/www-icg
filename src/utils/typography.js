import Typography from "typography"
//import moragaTheme from "typography-theme-moraga"
//moragaTheme.headerWeight = 200

//const typography = new Typography(moragaTheme)

const typography = new Typography({
  baseFontSize: "16px",
  headerFontFamily: ["Merriweather", "sans-serif"],
  bodyFontFamily: ["Merriweather", "sans-serif"],
  bodyWeight: 400,
})

export default typography
