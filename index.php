<?php

//cabeçalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//incluir a conexão
include_once 'conexao.php';

//query
$query_produtos = "SELECT id, titulo, descricao FROM produtos ORDER BY id DESC";

$result_produtos = $conn -> prepare($query_produtos);

$result_produtos->execute();

if(($result_produtos) AND ($result_produtos->rowCount() != 0)){
    while($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)){
        //var_dump($row_produto);
        extract($row_produto);

        $lista_produtos["records"][$id] = [
            'id' => $id,
            'titulo' => $titulo,
            'descricao' => $descricao
        ];
    }

    //resposta com status 200
    http_response_code(200);

    //retornar os produtos em formato json
    echo json_encode($lista_produtos);
}
