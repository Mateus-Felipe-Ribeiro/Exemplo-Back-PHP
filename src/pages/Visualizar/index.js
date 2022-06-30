import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, ConteudoTitulo, BotaoAcao, ButtonInfo, Titulo, ConteudoProd } from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  //const [id] = useState(props.match.params.id);
  const { id } = useParams();

  useEffect(() => {
    const getProduto = async () => {
      await fetch("http://localhost/testes%20react/visualizar.php?id=" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          setData(responseJson.produto);
        });
    };
    getProduto();
  }, [id]);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoProd>ID: {data.id}</ConteudoProd>
      <ConteudoProd>Titulo: {data.titulo}</ConteudoProd>
      <ConteudoProd>Descrição: {data.descricao}</ConteudoProd>
    </Container>
  );
};
