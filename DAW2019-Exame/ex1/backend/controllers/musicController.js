const Music = require("../Models/MusicModel");



module.exports.getById = id => {
  return Music.find({ id: id });
};


module.exports.compositores = () => {
  return Music.distinct("compositor");
};

module.exports.instrumentos = () => {
  return Music.aggregate(
    [{
    $unwind: "instrumento"
    }
  ]).exec();
};



module.exports.listCompositor = compositor => {
  return Music.find({ compositor: compositor });
};


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
