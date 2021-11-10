import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

const useAutenticado = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUsuarioAutenticado(usuario);
      } else {
        setUsuarioAutenticado(false);
      }
    });
    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
};

export default useAutenticado;
