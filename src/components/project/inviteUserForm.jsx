/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import { useMutation } from "react-apollo-hooks"
import InputSubmit from "@/components/form/inputSubmit"
import FormControl from "@/components/form/formControl"
import TextField from "@/components/form/textField"
import { INVITE_USER } from "@/graphql/user"

const form = css`
  padding: 0.5rem;
`

const formTitle = css`
  color: white;
  font-size: 1em;
`

const InviteUserForm = ({ projectId }) => {
  const [email, setEmail] = useState("")

  // Mutations
  const inviteUser = useMutation(INVITE_USER)

  const handleSubmit = async e => {
    e.preventDefault()
    inviteUser({ variables: { projectId, email } })
  }

  return (
    <form onSubmit={handleSubmit} css={form}>
      <h4 css={formTitle}>Invite Member</h4>
      <FormControl cssProps={{ padding: 0 }}>
        <TextField
          id="new-member-email"
          label="Member's Email"
          type="email"
          val={email}
          styles={{
            label: {
              color: "white"
            }
          }}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>

      <InputSubmit
        value="Invite"
        color="secondary"
        cssProps={{ marginTop: "1rem" }}
      />
    </form>
  )
}

InviteUserForm.propTypes = {
  projectId: PropTypes.string
}

export default InviteUserForm
