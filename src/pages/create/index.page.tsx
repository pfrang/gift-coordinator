import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import MongoDB from "../../sql-nodejs/cosmosdb/app";
import { LoadingBar } from "../../ui-kit/loading-bar/loading-bar";

interface CreatePageData {
  lobbyId: string;
}

export default function CreatePage({ ...props }: CreatePageData) {
  const [createPageLoading, setCreatePageLoading] = useState(false);
  const lobbyId = (parseInt(props.lobbyId, 10) + 1).toString();

  const [text, setText] = useState("");
  const router = useRouter();
  const db = new MongoDB();
  const { data: session, status } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    const errorTag = document.getElementById("error");

    if (status !== "authenticated") {
      errorTag.innerHTML =
        '<h2 class="text: red"> You need to sign in before creating a lobby</h2>';
      return;
    }

    if (!text) {
      errorTag.innerHTML =
        '<h2 class="text: red"> Please give the lobby a description</h2>';
      return;
    }
    setCreatePageLoading(true);
    try {
      const response = await db.createLobby({
        id: lobbyId,
        description: text,
        creator: session.user.email,
      });
      router.push(`/lobby/${lobbyId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      {createPageLoading ? (
        <LoadingBar />
      ) : (
        <>
          <form className="w-1/6" onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="Lobby"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <h4>Lobby Description</h4>
              </label>
              <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="I.e Christmas 2022"
                required
              />
              <p id="error" className="text-rose-400 text-sm w-full"></p>
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              value="Create"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(props) {
  const db = new MongoDB();
  const query = `SELECT * from c`;
  const response = await db.read(query).then((data) => data.resources);
  const lobbyId = response[response.length - 1].id;

  return {
    props: {
      lobbyId,
    },
  };
}
