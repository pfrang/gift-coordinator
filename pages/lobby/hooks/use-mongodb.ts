import axios from "axios";
import useSWR from "swr";




export const useMongoDB = (lobby) => {

  const params = {
    lobby: lobby
  }

  const fetcher = async (url) => await axios.get(url, {
    params
  }).then((res) => res.data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR('/api/mongodb', fetcher)

  const isLoading = !data && !error

  return { data, isLoading, error}
}
