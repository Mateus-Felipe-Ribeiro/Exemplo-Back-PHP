import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Container, ConteudoForm, ConteudoTitulo, Titulo, BotaoAcao, ButtonInfo,
   AlertSuccess, AlertDanger, Form, Label, Input, ButtonWarning } from './styles';



export const Editar = () =>{
    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    //const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editProduto = async e => {
        e.preventDefault();
        //console.log(titulo);

        await fetch("http://localhost/testes%20react/editar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, titulo, descricao})
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);

            if(responseJson.erro){
                setStatus({
                    type: 'error',
                    mensagem: responseJson.mensagem
                });
            }else{
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });
            }
        }).catch(() =>{
            setStatus({
                type: 'error',
                mensagem: "Produto não editado! tente novamente mais tarde!"
            });
        });
    }

    useEffect(() => {
        const getProduto = async () => {
        await fetch("http://localhost/testes%20react/visualizar.php?id=" + id)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                setTitulo(responseJson.produto.titulo);
                setDescricao(responseJson.produto.descricao);
            });
        };
        getProduto();
    }, [id]);


    return(
        <Container>
            <ConteudoForm>
                <ConteudoTitulo>
                    <Titulo>Editar</Titulo>
                    <BotaoAcao>
                        <Link to="/">
                        <ButtonInfo>Listar</ButtonInfo>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                <Form onSubmit={editProduto}>
                    <Label>Título:</Label>
                    <Input type="text" name="titulo" placeholder="Digite o titulo do produto" 
                    value={titulo} onChange={e => setTitulo(e.target.value)} />

                    <Label>Descrição:</Label>
                    <Input type="text" name="descricao" placeholder="Digite a descrição do produto" 
                    value={descricao} onChange={e => setDescricao(e.target.value)} />
                        
                    <ButtonWarning type="submit">Editar</ButtonWarning>
                </Form>
                { status.type === 'error'? <AlertDanger> {status.mensagem} </AlertDanger> : ""}
                { status.type === 'success'? <AlertSuccess> {status.mensagem} </AlertSuccess> : ""}
            </ConteudoForm>
        </Container>
    );
}

