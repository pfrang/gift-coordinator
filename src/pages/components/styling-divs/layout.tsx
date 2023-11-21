import React from "react";
import styled from "styled-components";

import Footer from "../footer";
import Header from "../header";

const Wrapper = styled.div`
  height: 100dvh;
  overflow: auto;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background-color: #0d1e45ef;
  font-size: 20px;
  @media (max-width: 780px) {
    font-size: 16px;
  }
`;

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default Layout;
