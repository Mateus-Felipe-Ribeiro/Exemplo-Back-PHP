import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo,
   AlertSuccess, AlertDanger, Form, Label, Input, ButtonSuccess } from './styles';

export const Cadastrar = () => {

  const [produto, setProduto] = useState({
    titulo: '',
    descricao: ''
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const valorInput = e => setProduto({...produto, [e.target.name]: e.target.value});

  const cadProduto = async e =>{
    e.preventDefault();
    //console.log(produto.titulo);

    await fetch("http://localhost/testes%20react/cadastrar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({produto})
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)
      if(responseJson.erro){
        setStatus({
          type: 'erro',
          mensagem: responseJson.mensagem
        });
      }else{
        setStatus({
          type: 'success',
          mensagem: responseJson.mensagem
        });
      }
    }).catch(() => {
      setStatus({
        type: 'erro',
        mensagem: 'Produto não cadastrado! tente novamente mais tarde!'
      });
    });
  }

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        <Form onSubmit={cadProduto} >
          <Label>Título:</Label>
          <Input type="text" name="titulo" placeholder="Digite o titulo do produto" onChange={valorInput} /><br /><br />

          <Label>Descrição:</Label>
          <Input type="text" name="descricao" placeholder="Digite a descrição do produto" onChange={valorInput} /><br /><br />
        
          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
        { status.type === 'erro'? <AlertDanger> {status.mensagem} </AlertDanger> : ""}
        { status.type === 'success'? <AlertSuccess> {status.mensagem} </AlertSuccess> : ""}
      </ConteudoForm>
    </Container>
  );
}
