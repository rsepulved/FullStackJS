import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TablaUsuario = (usuario) => {
  // console.log(usuario.usuario);
  const { email, nombre, anos_experiencia, password, especialidad } =
    usuario.usuario;

  // console.log(usuario.usuario.email);
  const navigate = useNavigate();
  const navigateToHome = (ruta) => {
    navigate(`${ruta}`);
  };

  useEffect(() => {
    reset({
      email: email,
      nombre: nombre,
      experiencia: anos_experiencia,
      password: password,
      especialidad: especialidad,
    });
  }, [usuario.usuario]);

  const { register, reset, handleSubmit } = useForm({});

  const onEdit = async (data) => {
    console.log(data);
    const response = await fetch(`http://localhost:3001/aut/edit`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const onDelete = async (data) => {
    const response = await fetch(`http://localhost:3001/aut/delete`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigateToHome("/");
  };

  return (
    <Fragment>
      <form>
        <div className="form-group row w-50 m-auto">
          <div className="form-group col-12 col-sm-6">
            <label>Email</label>
            <input
              className="form-control m-auto"
              disabled
              defaultValue={email}
              {...register("email")}
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label>Nombre</label>
            <input
              className="form-control m-auto"
              defaultValue={nombre}
              {...register("nombre")}
              name="nombre"
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control m-auto"
              name="password"
              required
              {...register("password", {
                required: { value: true, message: "Campo requerido" },
              })}
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label>Repita la password</label>
            <input
              type="password"
              className="form-control m-auto"
              {...register("passwordRep", {
                required: { value: true, message: "Campo requerido" },
              })}
              defaultValue={password}
              name="passwordRep"
              required
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label>Años de experiencia</label>
            <input
              className="form-control m-auto"
              defaultValue={anos_experiencia}
              {...register("experiencia")}
              name="experiencia"
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label>Especialidad</label>
            <input
              className="form-control m-auto"
              defaultValue={especialidad}
              {...register("especialidad")}
              name="especialidad"
            />
          </div>
        </div>
        <div className="mb-1">
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleSubmit(onEdit)}
          >
            Actualizar
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleSubmit(onDelete)}
          >
            Eliminar cuenta
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default TablaUsuario;
