/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

const base = css`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
`

const large = css`
  ${base}
  max-width: 1280px;
`

const small = css`
  ${base}
  max-width: 900px;
`

const sizeMap = {
  small,
  large
}

const ContentWrapper = ({ size = "large", children, cssProps }) => {
  return <div css={[sizeMap[size], cssProps]}>{children}</div>
}

ContentWrapper.propTypes = {
  size: PropTypes.oneOf(["full", "large", "small"]),
  children: PropTypes.node.isRequired,
  cssProps: PropTypes.object
}

export default ContentWrapper
