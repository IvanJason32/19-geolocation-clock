import { useEffect, useState } from "react";
import "./App.css";
import { useFetchIP } from "./hooks/useFetchIP";
import { useFetchLocation } from "./hooks/useFetchLocation";

function App() {
  const { IP, isPendingIP, getIP } = useFetchIP();
  const { data, isPending, error, getData } = useFetchLocation();
  const [hora, setHora] = useState(new Date());

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  useEffect(() => {
    const horaInicial = new Date(data.datetime);
    setHora(horaInicial);

    const interval = setInterval(() => {
      horaInicial.setSeconds(horaInicial.getSeconds() + 1);
      setHora(new Date(horaInicial));
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);


  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchInitialIP = async () => {
      try {
        await getIP("https://geolocation-db.com/json/");
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialIP();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await getData(`https://worldtimeapi.org/api/ip${IP}`);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [IP]);

  // useEffect(() => {
  //   const fetchTime = async () => {
  //     try {
  //       await getTime(`https://worldtimeapi.org/api/ip${IP}`);
  //     } catch (error) {
  //       console.error("Error fetching initial data:", error);
  //     }
  //   };
  //   fetchTime();
  // }, [IP]);


  return isPendingIP !== false ? (
    <div className={`principal ${hora.getHours() >= 21 && hora.getHours() <= 7 ? "dark":"light"}`}>
      <div className={`container ${hora.getHours() >= 21 && hora.getHours() <= 7 ? "dark":"light"}`}>
        <div className="notFound">
          <h1 className={`notFound-tittle`}>Loading data...</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className={`principal ${hora.getHours() >= 21 || hora.getHours() <= 7 ? "dark":"light"}`}>
      <div className={`container ${hora.getHours() >= 21 || hora.getHours() <= 7 ? "dark":"light"}`}>
        <p className="fecha-completa">
          {formatDate(new Date(data.datetime))} -{" "}
          {days[new Date(data.datetime).getDay()]}
        </p>
        <p className="dia-año">Día del año: {data.day_of_year}</p>
        <div className={`clock ${hora.getHours() >= 21 || hora.getHours() <= 7 ? "dark":"light"}`}>
          <p className="reloj">{hora.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
