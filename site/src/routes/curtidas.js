var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.post("/listar", function (req, res) {
    curtidaController.listar(req, res);
});

router.delete("/descurtir", function (req, res) {
    curtidaController.descurtir(req, res);
});

module.exports = router;