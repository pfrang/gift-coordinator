import create from 'zustand'

export const useCurrentUser: any = create((set) => ({
  currentUser: {},
  setCurrentUser: (e) => set(() => ({currentUser: e})),
}))
