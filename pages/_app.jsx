import React from "react";
import App from "next/app";
import app, { FirebaseContext } from "../firebase";
import useAutenticado from "../hooks/useAutenticado";

const MyApp = ({ Component, pageProps }) => {
  const user = useAutenticado();
  console.log(user);
  if (user === null) return <h1>Cargando...</h1>;
  return (
    <FirebaseContext.Provider
      value={{
        app,
        user,
      }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
