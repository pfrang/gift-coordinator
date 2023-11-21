import React from "react";
import styled from "styled-components";

import Footer from "../footer";
import Header from "../header";

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background-color: #0d1e45ef;
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
