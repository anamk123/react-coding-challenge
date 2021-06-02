const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const userRoutes = express.Router();
// let User = require('./user.model');
let Playlist = require('./playlist.model');



app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/playlist', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// userRoutes.route('/').get(function(req, res) {
//     User.find(function(err, user) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(user);
//         }
//     });
// });

userRoutes.route('/').get(function(req, res) {
    Playlist.find(function(err, playlist) {
        if (err) {
            console.log(err);
        } else {
            res.json(playlist);
        }
    });
});

// userRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     User.findById(id, function(err, user) {
//         res.json(user);
//     });
// });

// userRoutes.route('/update/:id').post(function(req, res) {
//     User.findById(req.params.id, function(err, user) {
//         if (!user)
//             res.status(404).send("data is not found");
//         else
//         user.user_name = req.body.user_name;
//         user.user_password = req.body.user_password;
        

//         user.save().then(user => {
//                 res.json('User updated!');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

// userRoutes.route('/add').post(function(req, res) {
//     let user = new User(req.body);
//     user.save()
//         .then(user => {
//             res.status(200).json({'user': 'user added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('adding new user failed');
//         });
// });

userRoutes.route('/add').post(function(req, res) {
    let playlist = new Playlist(req.body);
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