import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../Header';



function Layout({ children }) {

  const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #0d1e45ef;
  `

  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default Layout;
