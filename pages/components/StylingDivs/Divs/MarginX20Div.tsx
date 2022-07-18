import React, { Children } from 'react';

function MarginX20Div(props) {
  return (
    <div className='mx-20'>
      {props.children}
    </div>
  );
}

export default MarginX20Div;
