import axios from "axios";
import useSWR from "swr";

import { UserZustand } from "../../../context/context";

export const useMongoDB = (user: UserZustand) => {
  const params = {
    user: user,
  };

  const fetcher = async (url) =>
    await axios
      .get(url, {
        params,
      })
      .then((res) => res.data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(user.email ? "/api/mongodb" : null, fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error };
};
