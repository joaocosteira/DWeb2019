const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/index');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/dwebepocaespecial',{
     useNewUrlParser: true,
     useUnifiedTopology: true
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('./api', apiRouter);



app.get('/movies', async (req,res) =>{
    const movies = await Movie.find();
    res.jsonp(movies);
});


//app.use('/',indexRouter);

var port = process.env.PORT || 7777;
app.listen(port, () => console.log('Server running on port ' + port));