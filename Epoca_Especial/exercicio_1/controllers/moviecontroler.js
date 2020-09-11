
const Movie = require('./../models/Movie');


//de teste, find()
module.exports.test = () => {
  return Movie.find().exec();
};

//project do titulo e ano
module.exports.list = () => {
  return Movie.find({}, { _id: 0, title: 1, year: 1});
};

//Encontrar por id
module.exports.findById = id => {
  return Movie.findById(id);
};


/**
 * Find por atores:
 *  Temos de dar unwind do array atores e por fim encontrar os elemento unicos -> distinct
 */
module.exports.atores = () =>{
  return Movie.aggregate([{$unwind: "$cast"}, {$group: {_id: "$cast"}}, { $project : { _id : 0, "name" : "$_id"}}, { $sort: { name: 1 } }]);

}

/**
 * Filme por genero
 */
module.exports.byGenero = () =>{

  return Movie.aggregate([{$unwind: "$genres"}, {$group: {_id: "$genres"}} ]);

}

module.exports.byActor = () =>{

  return Movie.aggregate([{$unwind: "$cast"}, {$group: {_id: "$cast"}} ]);

}

/**
 * db.movies.aggregate([{$unwind: "$genres"}, {$group: {_id: "$genres", count: {$sum:1}}}])
 */

module.exports.filmesQuantAtor = () =>{
  return Movie.aggregate([{
    $project: {
      title: 1,
      num_partituras: {
        $cond: {
          if: { $isArray: "$cast" },
          then: { $size: "$cast" },
          else: 0
        }
      }
    }
  }])
}



