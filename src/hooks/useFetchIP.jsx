import { useState } from "react";

export const useFetchIP = () => {
  const [IP, setIP] = useState({});
  const [isPendingIP, setIsPendingIP] = useState({});

  const getIP = async (url) => {
    try {
      setIsPendingIP(true);
      setIP(null);
      let res = await fetch(url);
      if (!res.ok)
        throw {
          err: true,
          status: res.status,
          statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
        };

      let dataIP = await res.json();
      setIsPendingIP(false);
      setIP(dataIP.IPv4);
      // setError({ err: false });
    } catch (err) {
      setIsPendingIP(true);
      setIP(null);
      // setError(err);
    }
  };
  

  return { IP, isPendingIP, getIP };
};