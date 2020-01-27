//importar modulos
var express = require("express");
var router = express.Router();
const Music = require("../controllers/musicController");
var url = require('url');


//EX1.1) obter todas as obras
router.get("/obras", async function(req, res, next) {
  try {
    let compositor = req.query.compositor;
    let instrumento = req.query.instrumento;
    let obras;
    if (compositor) {
      obras = await Music.listCompositor();
    } else if (instrumento) {
      obras = await Music.getObrasInstrumento(instrumento);
    } else {
      obras = await Music.list();
    }
    res.jsonp(obras);
  } catch (error) {
    console.log(error);
    res.status(500).jsonp(error);
  }
});

//EX1.2) Obter as obras por id.
router.get("/obras/:id", async (req, res, next) => {
  try {
    const obra = await Music.getById(req.params.id);
    res.jsonp(obra);
  } catch (error) {
    console.log(error);
    res.status(500).jsonp(error);
  }
});


//EX1.3)
router.get("/compositores", async function(req, res, next) {
  try {
    res.jsonp(await Music.compositores());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});




// EX1.4) GET /api/obras?by=compositor
//GET /api/obras?by=instrumento
router.get("/obras", async function(req, res, next) {

  var q = url.parse(req.url, true);
  var query = q.query.by;
  try {
    if (query === 'compositor') {
      res.jsonp(await Music.compositores());
    } else if (req.query.instrumento) {
      console.log(query === 'instrumento');
      res.jsonp(await Music.query.instrumentos());
    } else {
      res.jsonp(await Music.list());
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});


module.exports = router;
