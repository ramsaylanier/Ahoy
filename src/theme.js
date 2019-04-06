import Color from "color"

const theme = {
  colors: {
    primary: "#354d98",
    secondary: "#e6d21b",
    background: {
      default: "#eee"
    },
    success: "#0dab48",
    error: "#ca4747"
  },
  zIndex: {
    main: 1,
    appHeader: 1000,
    drawer: 1100,
    modal: 1200,
    notification: 1300
  }
}

export const darkBlue = Color(theme.colors.primary)
  .darken(0.7)
  .string()

export const darkYellow = Color(theme.colors.secondary)
  .darken(0.1)
  .string()

export const darken = color => amount =>
  Color(color)
    .darken(amount)
    .string()

export const lighten = color => amount =>
  Color(color)
    .lighten(amount)
    .string()

export default theme
