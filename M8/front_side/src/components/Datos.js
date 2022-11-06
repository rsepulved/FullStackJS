import React, { Fragment, useState, useEffect } from "react";
import TablaUsuario from "./TablaUsuario";
import { useJwt } from "react-jwt";

const Datos = () => {
  const [users, setUsers] = useState([]);
  let usuario = window.location.href.split("datos/")[1];
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  const getAllUser = async () => {
    const response = await fetch(`http://localhost:3001/datos/${usuario}`);
    const data = await response.json();
    setUsers(data[0]);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  var componente;
  const isToken = async () => {
    if (decodedToken && usuario === decodedToken.data) {
      componente = <TablaUsuario usuario={users} />;
    } else {
      componente = <h1>No tienes los permisos para estar en esta direccion</h1>;
    }
  };
  isToken();

  return (
    <Fragment>
      <h1>Skate Park</h1>
      <div className="py-4">
        <h2>Datos del perfil</h2>
        <hr className="w-50" />
        <>{componente}</>
      </div>
    </Fragment>
  );
};

export default Datos;
