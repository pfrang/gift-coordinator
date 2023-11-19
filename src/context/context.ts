import create from "zustand";

import { CookieStorage } from "../pages/cookie/token-storage";

export interface UserZustand {
  email: string;
}

export interface DisplayMapInstance {
  currentUser?: UserZustand;
  setCurrentUser: (input: UserZustand) => void;
  logOut: () => void;
}

export const useCurrentUser = create<DisplayMapInstance>((set) => ({
  currentUser: { email: new CookieStorage().getCookie() || "" },
  setCurrentUser: (e) => set(() => ({ currentUser: e })),
  logOut: () => set(() => ({ currentUser: { email: "" } })),
}));
