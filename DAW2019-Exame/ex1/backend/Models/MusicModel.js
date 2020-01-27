const mongoose = require("mongoose");

//estrutura do modelo musical.
const musicSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  tipo: String,
  compositor: String,
  instrumento: Array,
  _id: String
});

module.exports = mongoose.model("music", musicSchema);
