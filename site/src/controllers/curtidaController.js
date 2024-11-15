var curtidaModel = require("../models/curtidaModel");

function listar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idPostagem = req.body.idPostagemServer;
    curtidaModel.listar(idPostagem, idUsuario)
        .then(
            function (resultadoListar) {
                console.log('Resultado da listagem:' + resultadoListar);
                res.json(resultadoListar);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as curtidas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar
}