var comentarioModel = require("../models/comentarioModel");

function comentar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idPostagem = req.body.idPostagemServer;
    var conteudo = req.body.conteudoServer;

    if (idUsuario == undefined) {
        res.status(400).send("O usuário está indefinido!");
    } else if (idPostagem == undefined) {
        res.status(400).send("A postagem está indefinida!");
    }else if (conteudo == undefined) {
        res.status(400).send("O conteúdo está indefinido!");
    } else {
        comentarioModel.comentar(idUsuario, idPostagem, conteudo)
            .then(
                function (resultadoComentar) {
                    console.log(resultadoComentar);
                    res.json(resultadoComentar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao comentar! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listar(req, res) {
    var idPostagem = req.body.idPostagemServer;

    if (idPostagem == undefined) {
        res.status(400).send("A postagem está indefinida!");
    } else {
        comentarioModel.listar(idPostagem)
            .then(
                function (resultadoComentar) {
                    console.log(resultadoComentar);
                    res.json(resultadoComentar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao comentar! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    comentar, 
    listar
}