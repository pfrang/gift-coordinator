import { useRouter } from "next/router";

import { useCurrentUser } from "../../context/context";
import { CookieStorage } from "../cookie/token-storage";

const { v4: uuidv4 } = require("uuid");

export const Login = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();

  const router = useRouter();

  const onLogout = (e) => {
    e.preventDefault();
    new CookieStorage().deleteCookie();
    setCurrentUser({ email: "" });
  };

  const onLogin = (e) => {
    e.preventDefault();
    const mailInput = e.target.email.value;

    const uuid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

    new CookieStorage().setCookie(mailInput, 60);
    setCurrentUser({ email: mailInput });

    if (router.query.callbackUrl) {
      router.push(router.query.callbackUrl as string);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      {currentUser.email ? (
        <div>
          <h5>{`Logget inn som ${currentUser.email}`}</h5>
          <button onClick={onLogout}>Logg ut</button>
        </div>
      ) : (
        <form onSubmit={onLogin}>
          <div className="flex flex-col h-full ">
            <label htmlFor="email">
              <h5>Email</h5>
            </label>
            <input required type="email" name="email" />

            <span className="h-2" />

            <input
              type="submit"
              className="rounded-md cursor-pointer shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs"
              value="Logg inn"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
