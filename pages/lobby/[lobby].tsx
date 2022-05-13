import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';




export default function LobbyPage(props) {

  const router = useRouter()
  console.log(props)
  const lobbyId = router.asPath
  return (
    <div>
      {lobbyId}
    </div>
  );
}

export async function getServerSideProps(params:any) {
  const { req, query } = params
  return  {
    props: {}
  }
}
