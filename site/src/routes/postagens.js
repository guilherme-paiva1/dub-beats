var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

router.post("/publicar", function (req, res) {
    postagemController.publicar(req, res);
});

router.get("/listar", function (req, res) {
    postagemController.listar(req, res);
});

module.exports = router;