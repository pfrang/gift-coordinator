import create from 'zustand'

export const useCurrentUser = create((set) => ({
  currentUser: {},
  setCurrentUser: (e) => set(() => ({currentUser: e})),
}))

export const useCurrentUserItems = create((set) => ({
  currentItems: [],
  setCurrentItems: (e) => set(() => ({ currentItems: e })),
}))
