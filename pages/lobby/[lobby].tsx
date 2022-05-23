import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { deserialize } from 'v8';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import LobbyForm from '../components/Forms/LobbyForm';
import ItemTable from '../components/ItemTable';


export default function LobbyPage(props) {
  const [form, setForm] = useState(false)

  const elements = props.response.people
  return (
    <div className='p-20 grid grid-cols-6 grid-rows-3 gap-12 content-center'>
      <button className="h-8 w-8 text-red-500" onClick={() => setForm((prevState) =>!prevState)}>
        <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
      </button>
      {form && <LobbyForm names={elements} val={form} onClick={setForm}/>}
      {elements && elements.map((item,idx) => {
        return <ItemTable name={item.name} items={item.items} index={idx} key={idx} />
      })}
    </div>
  );
}

export async function getServerSideProps(params: any) {
  const db = new mongoDB;
  const { lobby } = params.query;
  const query = `SELECT * from c where c.id = '${lobby}'`;
  const response = await db.read(query).then((data) => data.resources[0])
  return {
    props: {response}
  }
}
