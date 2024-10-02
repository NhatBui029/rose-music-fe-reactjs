import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Token, UserData } from '../types/auth.type'

type AppState = {
  currentUser: UserData | null
  verifyingToken: Token | null
  setCurrentUser: (data: UserData | null) => void
  setVerifyingToken: (data: Token | null) => void
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        verifyingToken: null,
        setCurrentUser: (data: UserData | null) =>
          set({ currentUser: data }, false, 'setCurrentUser'),
        setVerifyingToken: (data: Token | null) =>
          set({ verifyingToken: data }, false, 'setVerifyingToken'),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          currentUser: state.currentUser,
          verifyingToken: state.verifyingToken,
        }),
      },
    ),
  ),
)

export default useAppStore
