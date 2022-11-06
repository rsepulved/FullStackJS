import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm({});
  const navigate = useNavigate();
  const onLogin = async (data) => {
    const fetchJSON = async () => {
      const token = await fetch(`http://localhost:3001/aut/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await token.json();
    };
    const arr = await fetchJSON();
    localStorage.setItem("token", JSON.stringify(`${arr.mytoken}`));
    // console.log(arr.mytoken);
    navigate(`/datos/${data.email}`);
  };

  return (
    <Fragment>
      <h1>Skate Park</h1>

      <div className="py-5">
        <h2>Iniciar Sesión</h2>
        <hr className="w-50" />

        <form>
          <div className="form-group">
            <div className="form-group my-1">
              <label>Email</label>
              <input
                className="form-control w-50 m-auto"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="form-group my-1">
              <label>Password</label>
              <input
                className="form-control w-50 m-auto"
                name="password"
                type="password"
                {...register("password")}
              />
            </div>
          </div>
          <button
            className="btn btn-success my-3"
            // type="submit"
            onClick={handleSubmit(onLogin)}
          >
            Ingresar
          </button>
          <p>
            ¿Aún no tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
