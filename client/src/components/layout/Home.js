import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
// import '../css/home.css';
// import Button from '@material-ui/core/Button';
// import NewReleases from "./newRelease";
// import { playlistData } from "./playlistService";
// import Login from "./login";
import FeaturedPlaylist from './featuredPlaylists';
import NewReleases from './newReleases';


require('dotenv').config();




function Home(props){
    const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
    const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;

    const [newReleaseData, setReleaseData] = useState(null);
    const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
    const [categories, setCategories] = useState(null);
    const [token, setToken] = useState(null);
    const [nameText,  setNameTextState] = React.useState("");
    const [imgText,  setImgTextState] = React.useState("");
    const [artistText,  setArtistTextState] = React.useState("");
    const [isActive, setActive] = useState(false);
    // var cors = require('cors');  
    // Home.use(cors({credentials: true, origin: 'http://localhost:3000'}));
 

    // axios('https://accounts.spotify.com/api/token', {
    //   headers: {
    //     'Content-Type' : 'application/x-www-form-urlencoded',
    //     'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifySecret),
    //     // 'Access-Control-Allow-Credentials' : 'true',

    //   },
    //   data: 'grant_type=client_credentials',
    //   method: 'POST'
    // })
    // .then(response => setToken(response.data))

    // useEffect((e) => {

        
        // .then(response => setToken(response.data));cc
    
          //  axios.post(
          //   "http://localhost:4000/playlist/allPlaylists", tokenResponse.data.access_token
          //   );
          //  });
          // });
    
      //     axios('https://api.spotify.com/v1/browse/new-releases?country=NZ&limit=20&offset=5'
      //       , {
      //       method: 'GET',
      //       headers: { 
      //           'Authorization' : 'Bearer ' + tokenResponse.data.access_token,

      //           'Access-Control-Allow-Origin':'http://localhost:3000/'
      //       }
      //     })
          
      //     .then(response => setReleaseData(response.data));
      
      //       axios('https://api.spotify.com/v1/browse/featured-playlists?country=NZ&limit=20'
      //         , {
      //         method: 'GET',
      //         headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token,
      //         'Access-Control-Allow-Origin':'http://localhost:3000/'
      //       }
      //       })
      //       .then(response => setFeaturedPlaylist(response.data));

      //       axios('https://api.spotify.com/v1/browse/categories?country=NZ&limit=20&offset=5'
      //         , {
      //         method: 'GET',
      //         headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token,
      //         'Access-Control-Allow-Origin':'http://localhost:3000/'
      //       }
      //       })
      //       .then(response => setCategories(response.data));
            
      //     });
          
    
      // }, [spotifyClientId, spotifySecret]);

   
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
        .then(response => setToken(response.data))
        ;
          

      },[spotifyClientId, spotifySecret]);
      localStorage.setItem('myData', token);
      axios.post("http://localhost:4000/playlist/token", token);
      
     
     
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
        <FeaturedPlaylist
            title='Featured'
        />

        </>
//         <div>
// {console.log(token)}
// <p>{console.log(categories)}</p>
//           <form onSubmit={e => submitForm(e)}>
         
//                                         <input type="text" placeholder="name" value={nameText}/>
//                                         <input type="text" placeholder="img"  value={imgText}/>
//                                         <input type="text" placeholder="artist"  value={artistText}/>

//               {!newReleaseData || !featuredPlaylist || !categories ?  (
//                             <div>
//                                 Loading
//                             </div>

//                             ) : (
                            
//                             <div className="holdingContainer">

//                       <h3>New Releases</h3>

//                     <div className="flex">
//                                {newReleaseData['albums']['items'].map((data, index) => {
//                                 return(
//                                     <div className="items" key={index} src={data['images'][1]['url']} alt={data['name']} id={data['artists'][0]['name']} onClick={e => handleChangeInput(e)} >
//                                         <img src={data['images'][1]['url']} alt={data['name']} id={data['artists'][0]['name']}  ></img>
//                                         <p key={index} >{data['name']} <br/> {data['artists'][0]['name']}</p>

//                                     </div>
//                                 )
//                             },

//                             )}

//                                 </div>
//                                 {/* <Button  variant="contained" color="secondary"  type='submit' >Add to playlist</Button>  */}


//                                 <h3>Playlists</h3>

//                                     <div className="flex">
//                                     {featuredPlaylist['playlists']['items'].map((data, index) => {
//                                         return(
//                                             // console.log(data)
//                                             <div className="items" key={index} src={data['images'][0]['url']} alt={data['name']}  onClick={e => handleChangeInput(e)}>
//                                                 <img src={data['images'][0]['url']} alt={data['name']}></img>
//                                                 <p key={index}> {data['name']}</p>
//                                             </div>
//                                         )
//                             })}
//                                     </div>  
//                                     <h3>Categories</h3>

//                                     <div className="flex">

//                                         {/* {console.log(categories['categories'])} */}
//                                     {categories['categories']['items'].map((data, index) => {
//                                         return(
//                                             <div className="items" key={index} src={data['icons'][0]['url']} alt={data['name']} onClick={e => handleChangeInput(e)}>
//                                                 <img src={data['icons'][0]['url']} alt={data['name']} ></img>
//                                                 <p key={index}> {data['name']}</p>
//                                             </div>
//                                         )
//                             })}
//                                          </div>
//                                     </div> 

                            

                            
                            
//                             )} 
            
//             </form>
//         </div>
    )
}

export default Home;