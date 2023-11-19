const isBrowser = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export class CookieStorage {
  readonly name: string;

  constructor(name: string = "gavekoordinator") {
    this.getCookie = () => {
      if (!isBrowser()) return undefined;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    this.setCookie = (value, days) => {
      if (!isBrowser()) return undefined;

      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${
        value || ""
      }${expires}; path=/; SameSite=None; Secure`;
    };
    this.deleteCookie = () => {
      if (!isBrowser()) return undefined;
      document.cookie = `${name}=; Max-Age=-99999999;`;
    };
  }

  getCookie: () => string | undefined;
  setCookie: (value: string, days: number) => void;
  deleteCookie: () => void;
}
