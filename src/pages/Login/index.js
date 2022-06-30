import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, ConteudoTitulo, BotaoAcao, ButtonInfo, Titulo, ConteudoProd } from "./styles";

export const Login = () => {
    return (
        <Container>
          <ConteudoTitulo>
            <Titulo>Login</Titulo>
            <BotaoAcao>
              <Link to="/">
                <ButtonInfo>Entrar</ButtonInfo>
              </Link>
            </BotaoAcao>
          </ConteudoTitulo>
        </Container>
      );
};