/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"
import Tooltip from "@reach/tooltip"

const base = css`
  appearance: none;
  position: relative;
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

const IconButton = ({ onClick, children, color, cssProps, tooltip = "" }) => {
  const type = colorMap[color] || dflt
  return (
    <Tooltip label={tooltip}>
      <button onClick={onClick} css={[type, cssProps]}>
        {children}
      </button>
    </Tooltip>
  )
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  cssProps: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default IconButton
