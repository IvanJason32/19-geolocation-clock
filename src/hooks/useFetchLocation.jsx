import { useState } from "react";

export const useFetchLocation = () => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState({ err: false });

  const getData = async (url) => {
    try {
      setIsPending(true);
      setData({})
      let res = await fetch(url);
      if (!res.ok)
        throw {
          err: true,
          status: res.status,
          statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
        };

      let dataUser = await res.json();
      setIsPending(false);
      setData(dataUser);
      setError({ err: false });
    } catch (err) {
      setIsPending(true);
      setData(null);
      setError(err);
    }
  };
  

  return { data, isPending, error, getData };
}