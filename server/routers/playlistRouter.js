const axios = require('axios')
const router = require("express").Router();
const Playlist = require("../models/playlistModel");
const auth = require("../middleware/auth");
const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;
const https = require('https');





router.post("/", auth, async (req, res) => {
  try {
    const { name, image,  } = req.body;

    const newAdd = new Playlist({
      name,
      image
    });

    const savedPlaylist = await newAdd.save();

    res.json(savedPlaylist);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    
  }
});

router.post('/token', async function (req, res, ) {

  console.error(req.body);
  let featured = await axios.request({
        url: 'https://api.spotify.com/v1/browse/featured-playlists?country=NZ&limit=20',
        method: 'get',
    
        headers:
        {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'Bearer ' + req.body.access_token
        }
      }).catch(err => console.log(err))
    
    
    const cookie = res.cookie('spotify-token', req.body.access_token);
    console.error(featured);

    let newRelease = await axios.request({
      url: 'https://api.spotify.com/v1/browse/new-releases?country=NZ&limit=20&offset=5',
      method: 'get',
  
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + req.body.access_token
      }
    }).catch(err => console.log(err))
  
  
  console.error(newRelease);

  let categories = await axios.request({
    url: 'https://api.spotify.com/v1/browse/categories?country=NZ&limit=20&offset=5',
    method: 'get',

    headers:
    {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Bearer ' + req.body.access_token
    }
  }).catch(err => console.log(err))

  global.spotify_access_token = req.body.access_token;

console.error(categories);




});
// var saveToken = new Playlist

router.get("/token", async (req, res) => {
console.error(spotify_access_token = JSON.parse(body).access_token);
});

//   let token = await axios.request({
//     url: 'https://accounts.spotify.com/api/token',
//     method: 'post',

//     headers:
//     {
//       'content-type': 'application/x-www-form-urlencoded',
//       'authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifySecret)
//     },
//     data: 'grant_type=client_credentials',

//   })

 
  // console.error(token);

//   let featured = await axios.request({
//     url: 'https://api.spotify.com/v1/browse/featured-playlists?country=NZ&limit=20',
//     method: 'get',

//     headers:
//     {
//       'content-type': 'application/x-www-form-urlencoded',
//       'authorization': 'Bearer ' + req.body.access_token
//     }
//   }).catch(err => console.log(err))


// const cookie = res.cookie('spotify-token', req.body.access_token);
// console.error(featured);

  
// });







module.exports = router;
