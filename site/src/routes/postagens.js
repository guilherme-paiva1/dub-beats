var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

router.post("/publicar", function (req, res) {
    postagemController.publicar(req, res);
});

router.get("/listar", function (req, res) {
    postagemController.listar(req, res);
});

router.post("/curtir", function (req, res) {
    postagemController.curtir(req, res);
});

router.post("/listarPorUsuario", function (req, res) {
    postagemController.listarPorUsuario(req, res);
});

module.exports = router;