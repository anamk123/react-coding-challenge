import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../css/home.css';
import Button from '@material-ui/core/Button';


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
    // const [button, setButton] = React.useState(false);
  

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin' : '*',
             'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifySecret),
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          console.log(tokenResponse)
          setToken(tokenResponse.data.access_token);
    
          axios('https://api.spotify.com/v1/browse/new-releases?country=NZ&limit=20&offset=5'
            , {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token} 
          })
          
          .then(response => setReleaseData(response.data));
      
            axios('https://api.spotify.com/v1/browse/featured-playlists?country=NZ&limit=20'
              , {
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            })
            .then(response => setFeaturedPlaylist(response.data));

            axios('https://api.spotify.com/v1/browse/categories?country=NZ&limit=20&offset=5'
              , {
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            })
            .then(response => setCategories(response.data));
            
          });
    
      }, [spotifyClientId, spotifySecret]);

      const handleChangeInput = e =>{
        setImgTextState(e.target.src);
        setNameTextState(e.target.alt);
        setArtistTextState(e.target.id);

        const newPlaylist ={
          playlist_name : nameText,
          playlist_image: imgText,
          playlist_artist: artistText
         }

         axios.post('http://localhost:4000/playlist/add', newPlaylist)
         .then(res => console.log(res.data));
          }
     

      // const  submitForm = e => {
                               
      //   const newPlaylist ={
      //     playlist_name : nameText,
      //     playlist_image: imgText,
      //     playlist_artist: artistText
      //    }
     
      //    axios.post('http://localhost:4000/playlist/add', newPlaylist)
      //    .then(res => console.log(res.data))
      //   //  .then(history.push("/users"));
      //  }


    return(
        <div>

          {/* <form onSubmit={e => submitForm(e)}> */}
            {/* <input type="text" placeholder="name" value={nameText} />
            <input type="text" placeholder="img"  value={imgText}/>
            <input type="text" placeholder="artist"  value={artistText}/> */}

         
              {!newReleaseData || !featuredPlaylist || !categories ?  (
                            <div>
                                Loading
                            </div>

                            ) : (
                            
                            <div className="holdingContainer">
                      <h3>New Releases</h3>

                    <div className="flex">
                               {newReleaseData['albums']['items'].map((data, index) => {
                                return(
                                    <div className="items" key={index} src={data['images'][1]['url']} alt={data['name']} id={data['artists'][0]['name']}  onClick={e => handleChangeInput(e)} >
                                        <img src={data['images'][1]['url']} alt={data['name']} id={data['artists'][0]['name']}  ></img>
                                        <p key={index} >{data['name']} <br/> {data['artists'][0]['name']}
                                        </p>
                                        
                                        <Button  variant="contained" color="secondary" >Add to playlist</Button> 

                                    </div>
                          

                                    
                                    
                                )
                            })}
                            
                                </div>
                                <h3>Playlists</h3>

                                    <div className="flex">
                                    {featuredPlaylist['playlists']['items'].map((data, index) => {
                                        return(
                                            // console.log(data)
                                            <div className="items" key={index}>
                                                <img src={data['images'][0]['url']} alt={data['name']} onClick={e => handleChangeInput(e)}></img>
                                                <p key={index}> {data['name']}</p>
                                            </div>
                                        )
                            })}
                                    </div>  
                                    <h3>Categories</h3>

                                    <div className="flex">

                                        {/* {console.log(categories['categories'])} */}
                                    {categories['categories']['items'].map((data, index) => {
                                        return(
                                            <div className="items" key={index}>
                                                <img src={data['icons'][0]['url']} alt={data['name']} onClick={e => handleChangeInput(e)}></img>
                                                <p key={index}> {data['name']}</p>
                                            </div>
                                        )
                            })}
                                         </div>
                                    </div> 

                            

                            
                            
                            )} 
            
            {/* </form> */}
        </div>
    )
}

export default Home;