/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"

const base = css`
  appearance: none;
  border: 0;
  height: 26px;
  width: 26px;
  padding: 2px;
  border-radius: 50%;
  svg {
    height: 100%;
    width: 100%;
  }
`

const primary = css`
  ${base}
  background: ${theme.colors.primary};
`

const secondary = css`
  ${base}
  background: ${theme.colors.secondary};
  path {
    fill: ${theme.colors.primary};
  }
`

const dflt = css`
  ${base}
  background: ${theme.colors.background.default};
  path {
    fill: ${theme.colors.primary};
  }
`

const colorMap = {
  primary,
  secondary
}

const IconButton = ({ onClick, children, color, cssProps }) => {
  const type = colorMap[color] || dflt
  return (
    <button onClick={onClick} css={[type, cssProps]}>
      {children}
    </button>
  )
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  cssProps: PropTypes.object
}

export default IconButton
