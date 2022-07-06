import React, { Children } from 'react';

function Wrapper(props) {
  return (
    <div className='mx-20'>
      {props.children}
    </div>
  );
}

export default Wrapper;
