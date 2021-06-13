import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import FeaturedPlaylist from './featuredPlaylists';
import NewReleases from './newReleases';
import Categories from './categories';
import './app.css';



require('dotenv').config();


function Home(props){
    const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
    const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;

    const [newReleaseData, setNewReleases] = useState(null);
    const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
    const [categories, setCategories] = useState(null);
    const [token, setToken] = useState(null);
    const [nameText,  setNameTextState] = React.useState("");
    const [imgText,  setImgTextState] = React.useState("");
    const [artistText,  setArtistTextState] = React.useState("");
    const [isActive, setActive] = useState(false);

   
    useEffect((e) => {
    axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifySecret),
            // 'Access-Control-Allow-Credentials' : 'true',

          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(response => setToken(response.data));
      },[spotifyClientId, spotifySecret]);
      axios.post("http://localhost:4000/playlist/token", token);
      // localStorage.setItem('myData', token);

      
     
     
      const handleChangeInput = e =>{
        setNameTextState(e.target.alt);
        setArtistTextState(e.target.id);
        setImgTextState(e.target.src);
        console.log(imgText)

        setActive(isActive)       

      }
     

      const  submitForm = e => {
                          

        // const newPlaylist ={
        //   playlist_name : nameText,
        //   playlist_image: imgText,
        //   playlist_artist: artistText
        //  }
         
         e.preventDefault();
        // playlistData.postPlaylist();
    }




    return(
        <>

{!token ?  (
                            
                            <div>
                                Loading 
                            </div>
                            ) : (
                                <div>
                              <NewReleases/>
                              <FeaturedPlaylist


                              />
                              <Categories/>
                              </div>
                            )}       

</>
    )
}

export default Home;