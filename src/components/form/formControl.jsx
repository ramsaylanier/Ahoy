/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

const control = css`
  display: flex;
  flex-flow: column;
  padding: 0.5rem;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const FormControl = ({ children, cssProps }) => {
  return <div css={[control, cssProps]}>{children}</div>
}

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
  cssProps: PropTypes.object
}

export default FormControl
