import React, { Fragment, useState, useEffect } from "react";
import HomeView from "./HomeView";

const Home = () => {
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    const getParticipantes = () => {
      fetch("http://localhost:3001/participantes")
        .then((res) => res.json())
        .then((res) => setParticipantes(res));
      //   console.log(res)
    };
    getParticipantes();
  }, []);
  // console.log(participantes);

  return (
    <Fragment>
      <h1>Skate Park</h1>

      <div className="py-4">
        <h2>Lista de participantes</h2>
        <hr />
        <HomeView participantes={participantes} />
        <a href="/login">Iniciar Sesión</a> |<a href="/registro">Registrarme</a>
      </div>
    </Fragment>
  );
};

export default Home;
