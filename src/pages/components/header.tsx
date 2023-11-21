import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { useCurrentUser } from "../../context/context";

import MenuItems from "./menu-items";

const HeaderComp = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
  border-style: dashed double;
`;

const MediaDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  vertical-align: bottom;
  width: 100%;
  margin: 0px 8rem;
  @media (max-width: 1460px) {
    margin: 0px 3rem;
  }
  @media (max-width: 1280px) {
    margin: 0px 1rem;
  }
`;

function Header(props) {
  const { currentUser } = useCurrentUser();

  const arr = [
    "Home",
    "About",
    "Profile",
    currentUser.email ? "Logout" : "Login",
  ];
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");

  return (
    <HeaderComp>
      <MediaDiv>
        <div className="mt-auto">
          <Link href="/">
            <h2 className="rounded-sm cursor-pointer text-xl py-2">GiftMe</h2>
          </Link>
        </div>
        <nav className="mt-auto mr-20">
          <ul className="flex items-center gap-3 relative">
            {arr.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </ul>
        </nav>
      </MediaDiv>
    </HeaderComp>
  );
}

export default Header;
