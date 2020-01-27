const Music = require("../Models/MusicModel");


//usado
module.exports.getById = id => {
  return Music.find({ id: id });
};

//usado
module.exports.compositores = () => {
  return Music.distinct("compositor");
};
//usado
module.exports.instrumentos = () => {
  return Music.aggregate(
    [{
    $unwind: "instrumento"
    }
  ]).exec();
};


//usado
module.exports.listCompositor = compositor => {
  return Music.find({ compositor: compositor });
};
//usado
module.exports.getObrasInstrumento = i => {
  return Music.aggregate([
    {
      $unwind: "$instrumento"
    },
    {
      $match: { designacao: i }
    },
    { $project: { titulo: 1 } }
  ]).exec();
};
