const express = require('express');
const router = express.Router();
const Movie = require('./../controllers/moviecontroler');



//teste inicial pra find()
router.get('/movies', async (req,res) =>{

  try {
    const movies = await Movie.test();
    res.jsonp(movies);
  } catch (error) {
   console.log(error); 
  }

});

//lista por ano e titulo
router.get('/filmes', async (req,res) =>{
  try {    
    const movies = await Movie.list();
    res.jsonp(movies);
  } catch (error) {
    console.log(error); 
  }
});

//find by id.
router.get('/filmes/:id', async (req,res) =>{
  try {    
    const movies = await Movie.findById(req.params.id);
    res.jsonp(movies);
  } catch (error) {
    console.log(error);
  }
});


//lista por ano e titulo
router.get('/atores', async (req,res) =>{
  try {
    
    const movies = await Movie.atores();
    res.jsonp(movies);

  } catch (error) {
     console.log(error);
  }
});

//listar o genero
router.get('/genero', async (req,res) =>{

  if(req.query.by  == 'genero'){
    try {      
      const movies = await Movie.byGenero();
      res.jsonp(movies);
    } catch (error) {
      console.log(error);
    }
  }else if(req.query.by  == 'ator'){
    try {      
      const movies = await Movie.byActor();
      res.jsonp(movies);
    } catch (error) {
      console.log(error);
    }
  }
  else{
    res.send('erro');
  }
  
});

router.get('/filmesQuantAtor', async (req,res) =>{

  try {    
    const movies = await Movie.filmesQuantAtor();
    res.jsonp(movies);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;