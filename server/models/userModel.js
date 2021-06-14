const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  playlist: [{type: mongoose.Schema.Types.ObjectId, ref:'Playlist'}]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
