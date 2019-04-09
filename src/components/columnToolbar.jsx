/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { darkenPrimary } from "@/theme"

const darkBlue = darkenPrimary(0.3)

const toolbar = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${darkBlue};
  padding: 0.5rem 0;
  button {
    background: ${darkBlue};
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
