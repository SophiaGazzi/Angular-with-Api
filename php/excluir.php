<?php

//Incluir a conexão
include('conexao.php');

//Obter dados
$obterDados = file_get_contents('php://input');

//Extrair os dados do Json
$extrair = json_decode($obterDados);

//Separar os dados do Json
$idCurso = $extrair->cursos->idCurso;

//SQL
$sql = "DELETE FROM cursos WHERE idCurso=$idCurso";
mysqli_query($conexao,$sql);


?>