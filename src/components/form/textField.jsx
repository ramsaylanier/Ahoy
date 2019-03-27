/** @jsx jsx */
import { Fragment } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"

const labelStyle = css`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`

const input = css`
  border: 0;
`

const typeMap = {
  text: function Component(props) {
    return <input type="text" css={input} {...props} />
  },
  email: function Component(props) {
    return <input type="email" css={input} {...props} />
  },
  textArea: function Component(props) {
    return <textarea css={input} {...props} />
  }
}

const TextField = ({ label, type = "text", id, onChange, styles }) => {
  return (
    <Fragment>
      {label && (
        <label htmlFor={id} css={[labelStyle, styles.label]}>
          {label}
        </label>
      )}
      {typeMap[type]({ onChange, id })}
    </Fragment>
  )
}

TextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  styles: PropTypes.object
}

export default TextField
