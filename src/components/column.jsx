/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import posed from "react-pose"
import theme, { darkBlue, lightenPrimary } from "@/theme"

import ExpandRightIcon from "@/icons/expandRightIcon"
import ExpandLeftIcon from "@/icons/expandLeftIcon"

const PosedColumn = posed.div({
  open: { width: ({ max }) => max },
  close: { width: ({ min }) => min }
})

const flex = css`
  display: flex;
`

const list = css`
  ${flex}
  flex-flow: column;
  background: white;
  border-right: 2px solid ${darkBlue};
`

const header = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0.5rem;
  background: ${lightenPrimary(1.3)};
`

const toggle = css`
  ${flex}
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: 0;
  padding: 0;
  width: 100%;
  text-align: end;
  &:focus {
    outline: none;
  }
  svg {
    height: 24px;
    width: 24px;
    path {
      fill: ${theme.colors.primary};
    }
  }
`

const text = css`
  font-size: 0.9rem;
  margin: 0;
`

const Column = ({ max = "auto", min = 100, children, title }) => {
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  return (
    <PosedColumn css={list} pose={open ? "open" : "close"} max={max} min={min}>
      <div css={header}>
        <button onClick={handleExpand} css={toggle}>
          {title && <h3 css={text}>{title}</h3>}
          {open ? <ExpandLeftIcon /> : <ExpandRightIcon />}
        </button>
      </div>
      {children}
    </PosedColumn>
  )
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
  max: PropTypes.oneOfType(["string", "number"]),
  min: PropTypes.oneOfType(["string", "number"]),
  title: PropTypes.string
}

export default Column
