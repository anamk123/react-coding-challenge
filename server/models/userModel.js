const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  spotifyToken : {type: String},
  playlist: [{type: mongoose.Schema.Types.ObjectId, ref:'Playlist'}]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
