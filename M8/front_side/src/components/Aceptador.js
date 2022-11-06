import React, { Fragment, useState } from "react";

const Aceptador = ({ participante }) => {
  const [aceptado, setAceptado] = useState(participante.estado);

  const cambiarEstado = (id) => {
    setAceptado(!aceptado);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, aceptado }),
    };
    fetch("http://localhost:3001/participante", requestOptions);
    // console.log(aceptado);
  };

  return (
    <Fragment>
      <input
        className="form-check-input"
        name={participante.id}
        type="checkbox"
        value="Aprobado"
        id="flexCheckDefault"
        onClick={() => {
          cambiarEstado(participante.id);
        }}
        defaultChecked={aceptado}
      ></input>
    </Fragment>
  );
};

export default Aceptador;
