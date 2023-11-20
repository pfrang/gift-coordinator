import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useCurrentUser } from "../../context/context";
import { CookieStorage } from "../cookie/token-storage";
import { useShouldHydrate } from "../utils/should-hydrate";

function MenuItems(props) {
  const [invalidProfileDirect, setInvalidProfileDirect] = useState(false);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { shouldHydrate } = useShouldHydrate();

  const path = router.asPath;

  useEffect(() => {
    currentUser.email && setInvalidProfileDirect(false);
  }, [currentUser]);

  const onLogout = () => {
    new CookieStorage().deleteCookie();
    setCurrentUser({ email: "" });
    router.push(`/login?callbackUrl=${path}`);
  };

  const redirect = (e) => {
    switch (props.items) {
      case "Profile":
        !currentUser.email
          ? setInvalidProfileDirect(true)
          : router.push("/profile");
        return;
      case "Login":
        return router.push("/login");
      case "Logout":
        return onLogout();
      case "Home":
        router.push("/");
      default:
        return "";
    }
  };

  return (
    <>
      {shouldHydrate && (
        <li className="p-2 cursor-pointer" id={props.items}>
          <a onClick={redirect} className="text-sm">
            {props.items}
          </a>
          {invalidProfileDirect && (
            <p className="my-2 whitespace-nowrap absolute w-10 top-8 right-18 text-sm flex text-red-500">
              Please log in
            </p>
          )}
        </li>
      )}
    </>
  );
}

export default MenuItems;
