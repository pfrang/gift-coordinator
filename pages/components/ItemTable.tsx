import React from 'react';
import productFetcher from '../api/hello';


function ItemTable(props) {

  const onSubmit = async (e) => {
    e.preventDefault()
    const query = "hi"
    const response = await productFetcher(query)
    console.log(response)
  }
  return (
    <div>
      <p className='text-rose-600'><b>{props.name}</b>'s Wish List !</p>
      <form onSubmit={onSubmit}>
        <label className='block' htmlFor="wish" >Navn</label>
        <input className='border-4 border-indigo-600' placeholder='Add wish' type="text" name="" id="wish" />
        <input className='p-1 rounded bg-black text-white' type="submit" />
      </form>
      {/* <table className="table-fixed">
        <thead>
          <tr>
            <th>{props.name}</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default ItemTable;
