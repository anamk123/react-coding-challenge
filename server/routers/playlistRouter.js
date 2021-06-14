const axios = require('axios')
const router = require("express").Router();
const Playlist = require("../models/playlistModel");
const auth = require("../middleware/auth");
const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;
const https = require('https');
const { json } = require('body-parser');





router.post("/add", auth, async (req, res) => {

  // const newAdd = new Playlist(req.body);
  // newAdd.save(err=>{
  //       if(err)
  //           res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
  //       else{
  //           req.user.pla.push(todo);
  //           req.user.save(err=>{
  //               if(err)
  //                   res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
  //               else
  //                   res.status(200).json({message : {msgBody : "Successfully created todo", msgError : false}});
  //           });
  //       }

  try {
    const { image, name } = req.body;

    const newAdd = new Playlist(req.body);
    const savedPlaylist = await newAdd.save();
    console.error(savedPlaylist);

    res.json(savedPlaylist);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/saved", auth, async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    
  }
});

router.post('/token', async function (req, res, ) {
  // console.error(req.body.access_token);
  res
      .cookie("spotify-token", req.body.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();

});
// var saveToken = new Playlist

router.get("/featured", async (req, res) => {
  const rawCookies = req.headers.cookie.split('; ');

  const parsedCookies = {};
 rawCookies.forEach(rawCookie=>{
 const parsedCookie = rawCookie.split('=');

  parsedCookies[parsedCookie[0]] = parsedCookie[1];
 });
 const spotifyToken = parsedCookies['spotify-token'];  



 let featured = await axios.request({
      url: 'https://api.spotify.com/v1/browse/featured-playlists?country=NZ&limit=20',
      method: 'get',
  
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + spotifyToken
      }
    }).catch(err => console.log(err));
    // console.error(featured.data);
    res.send(featured.data);

});

router.get("/newreleases", async (req, res) => {
  const rawCookies = req.headers.cookie.split('; ');

  const parsedCookies = {};
 rawCookies.forEach(rawCookie=>{
 const parsedCookie = rawCookie.split('=');

  parsedCookies[parsedCookie[0]] = parsedCookie[1];
 });
 const spotifyToken = parsedCookies['spotify-token'];  



 let newrelease = await axios.request({
      url: 'https://api.spotify.com/v1/browse/new-releases?country=NZ&limit=20&offset=5',
      method: 'get',
  
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + spotifyToken
      }
    }).catch(err => console.log(err));
      res.send(newrelease.data);
    

});

router.get("/categories", async (req, res) => {
  const rawCookies = req.headers.cookie.split('; ');

  const parsedCookies = {};
 rawCookies.forEach(rawCookie=>{
 const parsedCookie = rawCookie.split('=');

  parsedCookies[parsedCookie[0]] = parsedCookie[1];
 });
 const spotifyToken = parsedCookies['spotify-token'];  



 let categories = await axios.request({
      url: 'https://api.spotify.com/v1/browse/categories?country=NZ&limit=20&offset=5',
      method: 'get',
  
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + spotifyToken
      }
    }).catch(err => console.log(err));

    res.send(categories.data);

});




module.exports = router;
