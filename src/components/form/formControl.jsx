/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

const control = theme => css`
  display: flex;
  flex-flow: column;
  background: ${theme.colors.background.default};
  padding: 0.5rem;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const FormControl = ({ children }) => {
  return <div css={control}>{children}</div>
}

FormControl.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormControl
