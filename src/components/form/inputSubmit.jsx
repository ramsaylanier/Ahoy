/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import theme from "@/theme"

const base = css`
  border: 0;
  padding: 0.5rem 1rem;
`

const primary = css`
  ${base}
  background: ${theme.colors.primary};
`

const secondary = css`
  ${base}
  background: ${theme.colors.secondary};
  color: ${theme.colors.primary};
`

const colorMap = {
  primary,
  secondary
}

const InputSubmit = ({ value, cssProps, color }) => {
  return <input type="submit" value={value} css={[colorMap[color], cssProps]} />
}

InputSubmit.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  cssProps: PropTypes.object
}

export default InputSubmit
