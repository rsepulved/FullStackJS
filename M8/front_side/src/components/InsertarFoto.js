import React from "react";

const InsertarFoto = (participante) => {
  let url = `http://localhost:3001/imgs/${participante.participante.foto}`;
  return (
    <img
      id={participante.participante.nombre}
      alt={participante.participante.foto}
      className="foto"
      src={url}
    ></img>
  );
};

export default InsertarFoto;
