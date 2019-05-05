import React from "react"
import PropTypes from "prop-types"

export default function Icon({ children, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" {...rest}>
      {children}
    </svg>
  )
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  cssProps: PropTypes.object
}
