import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import {
  Campo,
  Error,
  Formulario,
  InputSubmit,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validaciones/iniciarSesionValidacion";
import { login } from "../firebase/firebase";

const Login = () => {
  const STATE_INICIAL = {
    nombre: "",
    email: "",
    password: "",
  };

  const iniciarSesion = async () => {
    const sesionIniciadaEstado = await login(email, password);
    if (sesionIniciadaEstado) {
      setErroriniciandoSesion(true);
      setErrorMessage(cuentaCreadaEstado);
    } else {
      Router.push("/");
    }
  };

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  const [erroriniciandoSesion, setErroriniciandoSesion] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}>
          Iniciar Sesion
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu mail"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          <InputSubmit type="submit" value="Iniciar Sesion" />
          {erroriniciandoSesion && <Error>{errorMessage}</Error>}
        </Formulario>
      </>
    </Layout>
  );
};

export default Login;
