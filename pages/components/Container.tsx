
import React from 'react';
import Footer from './Footer';
import FrontPageForm from './Forms/FrontPageForm';
import Header from './Header';


function Container(props) {




  return (
    <div id="wrapper">
      <Header/>
      <FrontPageForm />
      <Footer/>
    </div>
  );
}

export default Container;
