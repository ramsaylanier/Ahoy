/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"

const { colors } = theme

const base = css`
  border: 0;
  border-radius: 5px;
  padding: 1rem;
  text-transform: uppercase;
  font-size: 1rem;
`

const text = css``

const types = {
  base,
  text: [base, text]
}

const colorSchemes = {
  primary: {
    base: {
      color: "white",
      background: colors.primary
    },
    text: {
      color: colors.primary,
      background: "transparent"
    }
  },
  secondary: {
    base: {
      color: colors.primary,
      background: colors.secondary
    },
    text: {
      color: colors.secondary,
      background: "transparent"
    }
  }
}

const Button = ({
  children,
  color = "primary",
  type = "base",
  cssProps,
  ...props
}) => {
  return (
    <button css={[types[type], colorSchemes[color][type], cssProps]} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  cssProps: PropTypes.object,
  type: PropTypes.string,
  color: PropTypes.string
}

export default Button
