const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const userRoutes = express.Router();
// let User = require('./user.model');
let Playlist = require('./playlist.model');



app.use(cors(function(req, res, next){}));
app.use(bodyParser.json());



mongoose.connect('mongodb://127.0.0.1:27017/playlist', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

userRoutes.route('/add').post(function(req, res) {


    let playlist = new Playlist(req.body)
    playlist.save()
        .then(playlist => {
            res.status(200).json({'playlist': 'playlist added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new playlist failed');
        });
});


app.use('/playlist', userRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});