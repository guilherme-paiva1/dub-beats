var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.post("/listar", function (req, res) {
    curtidaController.listar(req, res);
});

module.exports = router;