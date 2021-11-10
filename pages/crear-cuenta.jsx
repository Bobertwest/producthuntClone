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
import validarCrearCuenta from "../validaciones/crearCuentaValidacion";
import { registrarUsuario } from "../firebase/firebase";

const CrearCuenta = () => {
  const STATE_INICIAL = {
    nombre: "",
    email: "",
    password: "",
  };

  const crearCuenta = async () => {
    const cuentaCreadaEstado = await registrarUsuario(nombre, email, password);
    if (cuentaCreadaEstado) {
      setErrorCreandoCuenta(true);
      setErrorMessage(cuentaCreadaEstado);
    } else {
      Router.push("/");
    }
  };

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;

  const [errorCreandoCuenta, setErrorCreandoCuenta] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}>
          Crear cuenta
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu Nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
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
          <InputSubmit type="submit" value="Crear cuenta" />
          {errorCreandoCuenta && <Error>{errorMessage}</Error>}
        </Formulario>
      </>
    </Layout>
  );
};

export default CrearCuenta;
