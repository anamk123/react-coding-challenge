const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Playlist = new Schema({
    playlist_name:{
        type: String
    },
    playlist_image:{
        type: String
    }
});

module.exports = mongoose.model('Playlist', Playlist);