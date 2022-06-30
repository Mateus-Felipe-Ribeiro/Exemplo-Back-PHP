import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  Titulo,
  Table,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
  AlertDanger,
  AlertSuccess
} from "./styles";

export const Home = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const getProdutos = async () => {
    fetch("http://localhost/testes%20react/index.php")
      .then((response) => response.json())
      .then((responseJson) =>
        //console.log(responseJson),
        setData(responseJson.records)
      );
  };

  const apagarProduto = async (idProduto) => {
    //console.log(idProduto);

    await fetch("http://localhost//testes%20react/apagar.php?id=" + idProduto)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
          getProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: 'success',
          mensagem: "Erro: Produto não apagado! Tente novamente mais tarde!"
        });
        //console.log("Erro: Produto não apagado! Tente novamente mais tarde!");
      });
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listagem</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      { status.type === 'erro'? <AlertDanger> {status.mensagem} </AlertDanger> : ""}
      { status.type === 'success'? <AlertSuccess> {status.mensagem} </AlertSuccess> : ""}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td>
                <Link to={"/visualizar/" + produto.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>{" "}
                <Link to={"/editar/" + produto.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>{" "}
                <ButtonDanger onClick={() => apagarProduto(produto.id)}>
                  Apagar
                </ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
