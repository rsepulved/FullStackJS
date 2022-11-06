import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();
  const navigateToHome = (ruta) => {
    navigate(`/${ruta}`);
  };
  return (
    <Fragment>
      <h1>Skate Park</h1>
      <div className="py-4">
        <h2>Registro</h2>
        <hr className="w-50" />

        <form
          action="http://localhost:3001/participante"
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="form-group row w-50 m-auto">
            <div className="form-group col-12 col-sm-6">
              <label>Email</label>
              <input name="email" className="form-control m-auto" required />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label>Nombre</label>
              <input name="nombre" className="form-control m-auto" required />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label>Password</label>
              <input
                name="password"
                className="form-control m-auto"
                type="password"
                required
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label>Repita la password</label>
              <input
                name="passwordrepeat"
                className="form-control m-auto"
                type="password"
                required
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label>Años de experiencia</label>
              <input
                name="experiencia"
                className="form-control m-auto"
                required
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label>Especialidad</label>
              <input
                name="especialidad"
                className="form-control m-auto"
                required
              />
            </div>
            <div className="form-group col-12 col-sm-12 mt-3">
              <label>Foto de perfil</label>
              <input className="mx-2" name="foto" type="file" required />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-info my-3"
            onSubmit={navigateToHome()}
          >
            Registrarme
          </button>
          <p>
            <a href="/login"> Iniciar sesión</a>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Registro;
