/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"

const toolbar = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${theme.colors.primary};
  padding: 0.5rem 0;
  button {
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
