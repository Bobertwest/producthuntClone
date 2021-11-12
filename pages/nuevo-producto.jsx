import React, { useContext, useState } from "react";
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
import validarNuevoProducto from "../validaciones/nuevoProductoValidacion";
import { FirebaseContext } from "../firebase";
import { SubirImagen, subirProductoNuevo } from "../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";

const NuevoProducto = () => {
  const { user, app } = useContext(FirebaseContext);

  const [nombreImagen, setNombreImagen] = useState("");
  const [imagenSubiendo, setImagenSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");

  if (!user) {
    Router.push("/login");
  }
  const STATE_INICIAL = {
    nombre: "",
    empresa: "",
    imagen: "",
    url: "",
    descripcion: "",
  };

  const subirProducto = async () => {
    if (!user) {
      Router.push("/login");
    } else {
      //Subir el producto
      const product = {
        nombre,
        empresa,
        url,
        urlImagen,
        descripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
      };
      const ProductoSubido = await subirProductoNuevo(product);
      if (ProductoSubido.resultado) {
        setErrorSubiendoProducto(false);
        alert("Producto Subido");
        Router.push("/");
      } else {
        setErrorSubiendoProducto(true);
        setErrorMessage(ProductoSubido.error.message);
      }
    }
  };

  const handleUploadStart = () => {
    setProgreso(0);
    setImagenSubiendo(true);
  };
  const handleProgress = (progreso) => setProgreso({ progreso });
  const handleUploadError = (error) => {
    setImagenSubiendo(error);
    setProgreso(0);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setImagenSubiendo(false);
    setNombreImagen(nombre);
    const imagenSubida = await SubirImagen(nombre);
    console.log(imagenSubida);
    if (imagenSubida.resultado) {
      setUrlImagen(imagenSubida.url);
    }
  };

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarNuevoProducto, subirProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  const [errorSubiendoProducto, setErrorSubiendoProducto] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}>
          Nuevo Producto
        </h1>

        <Formulario onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Informacion General</legend>

            <Campo>
              <label htmlFor="nombre">Nombre de producto</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre de producto"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}

            <Campo>
              <label htmlFor="nombre">Empresa o conpañia</label>
              <input
                type="text"
                id="empresa"
                placeholder="Nombre de empresa"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}

            <Campo>
              <label htmlFor="nombre">Imagen</label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={app.storage().ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </Campo>
            {errores.imagen && <Error>{errores.imagen}</Error>}

            <Campo>
              <label htmlFor="nombre">URL</label>
              <input
                type="url"
                id="url"
                placeholder="URL de producto"
                name="url"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>Sobre el producto</legend>

            <Campo>
              <label htmlFor="nombre">Descripcion</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}
          </fieldset>

          {errorSubiendoProducto && <Error>{errorMessage}</Error>}
          <InputSubmit
            type="submit"
            value="Subir producto"
            disabled={urlImagen ? false : true}
          />
        </Formulario>
      </>
    </Layout>
  );
};

export default NuevoProducto;
