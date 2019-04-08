/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme, { lightenPrimary } from "@/theme"

const toolbar = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${lightenPrimary(1.4)};
  button {
    margin: 0;
    border-radius: 0;
    background: ${theme.colors.primary};
    path {
      fill: white;
    }
  }
`

const ColumnToolbar = ({ children }) => {
  return <div css={toolbar}>{children}</div>
}

ColumnToolbar.propTypes = {
  children: PropTypes.node.isRequired
}

export default ColumnToolbar
