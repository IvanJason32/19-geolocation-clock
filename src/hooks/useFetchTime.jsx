import { useState } from "react";

export const useFetchTime = () => {
  const [time, setTime] = useState();

  const getTime = async (url) => {
    try {
      setTime(null)
      let res = await fetch(url);
      if (!res.ok)
        throw {
          err: true,
          status: res.status,
          statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
        };

      let data = await res.json();
      setTime(data.datatime);
    } catch (err) {
      setTime(null);
    }
  };
  

  return { time, getTime };
};