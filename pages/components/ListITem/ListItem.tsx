import React from 'react';

function ListItem(props) {
  return (
    <div id={`item-${props.idx}`} className='relative flex'>
      <li className='border-b-2' key={props.idx}>
        {props.item.description}
      </li>
      <svg id={props.idx} onClick={() => props.onDelete(props.idx)} className='cursor-pointer absolute -right-6 top-0' version="1.1" x="0px" y="0px" width="27.332px" height="27.332px" viewBox="0 0 27.332 27.332" xmlSpace="preserve">
        <path d="M25.832,0H1.5C0.671,0,0,0.671,0,1.5v24.332c0,0.829,0.671,1.5,1.5,1.5h24.332c0.828,0,1.5-0.671,1.5-1.5V1.5   C27.332,0.671,26.66,0,25.832,0z M24.332,24.332H3V3h21.332V24.332z M4.999,13.666c0-1.104,0.896-2,2-2h13.334c1.104,0,2,0.896,2,2   c0,1.104-0.896,2-2,2H6.999C5.895,15.666,4.999,14.77,4.999,13.666z" />
      </svg>
    </div>
  );
}

export default ListItem;
