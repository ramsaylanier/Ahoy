// import { useState, useEffect } from "react"
import { useStore } from "@/state/store"

const useIsOwner = project => {
  const authState = useStore("auth")
  if (project === undefined) return false
  const projectOwnerId = project.owner ? project.owner.id : null
  return authState.userProfile && authState.userProfile.sub === projectOwnerId
}

export default useIsOwner
