import React, { useContext, useState } from "react";
import Link from "next/link";
import Buscador from "../ui/Buscador";
import Navegacion from "./Navegacion";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Boton from "../ui/Boton";
import { FirebaseContext } from "../../firebase";
import { logout } from "../../firebase/firebase";

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const { user } = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}>
      <ContenedorHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}>
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Buscador />
          <Navegacion />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}>
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}>
                Hola: {user.displayName}
              </p>
              <Boton bgColor onClick={() => logout()}>
                Cerrar Sesión
              </Boton>
            </>
          ) : (
            <>
              <Link href="/login">
                <Boton bgColor>Iniciar Sesión</Boton>
              </Link>
              <Link href="/crear-cuenta">
                <Boton>Crear cuenta</Boton>
              </Link>
            </>
          )}
        </div>
      </ContenedorHeader>
    </header>
  );
};

export default Header;
