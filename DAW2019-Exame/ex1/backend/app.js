
//importação de modulos
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var apiRouter = require("./routes/api");


//cria a app de expresse
var app = express();

//ligação à base de dados
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/musicas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log("MongoDB connected: " + mongoose.connection.readyState)
  )
  .catch(() => console.log("MongoDB connection error"));



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//public estatica
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);


//tratamento do 404
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
