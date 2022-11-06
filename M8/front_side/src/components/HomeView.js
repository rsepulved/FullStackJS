import React, { Fragment } from "react";
import InsertarFoto from "./InsertarFoto";

const HomeView = ({ participantes }) => {
  return (
    <Fragment>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Foto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((participante, index) => (
            <tr key={participante.id}>
              <td>{index + 1}</td>
              <td>
                <InsertarFoto participante={participante} />
              </td>
              <td>{participante.nombre}</td>
              <td>{participante.anos_experiencia}</td>
              <td>{participante.especialidad}</td>
              <td
                className={
                  participante.estado === true
                    ? "estadoAceptado"
                    : "estadoRevision"
                }
              >
                {participante.estado === true ? "Aprobado" : "En revision"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default HomeView;
