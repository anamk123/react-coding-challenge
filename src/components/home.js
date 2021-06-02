import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../css/home.css';



function Home(props){
    const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
    const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;

    const [newReleaseData, setReleaseData] = useState(null);
    const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
    const [categories, setCategories] = useState(null);
    const [token, setToken] = useState(null);
    const [nameText,  setNameTextState] = React.useState("");
    const [imgText,  setImgTextState] = React.useState("");

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifySecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
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

      const handleChange = e => {
        setNameTextState(e.target.id);
        console.log(nameText);
      }
    
      const handleChangeImg = e =>{
        setImgTextState(e.target.src);
      }

      const  submitForm = e => {
                               
        const newPlaylist ={
          playlist_name : nameText,
          playlist_image: imgText
         }
     
         axios.post('http://localhost:4000/playlist/add', newPlaylist)
         .then(res => console.log(res.data))
        //  .then(history.push("/users"));
       }


    return(
        <div>

          <form onSubmit={e => submitForm(e)}>
            <input type="text" placeholder="name" value={nameText} />
            <input type="text" placeholder="img"  value={imgText}/>
            <button type='submit'>Submit</button>
          </form>
              {!newReleaseData || !featuredPlaylist || !categories ?  (
                            <div>
                                Loading
                            </div>

                            ) : (
                            
                            <div className="holdingContainer">

                    <div className="flex">
                               {newReleaseData['albums']['items'].map((data, index) => {
                                return(
                                    <div className="items" key={index}>
                                        <img src={data['images'][1]['url']} onClick={e => handleChangeImg(e)}></img>
                                        <p key={index} id={data['name']} onClick={e => handleChange(e)}>{data['name']} <br></br> {data['artists'][0]['name']}</p>
                                    </div>
                                )
                            })}
                                </div>

                                    <div className="flex">
                                    {featuredPlaylist['playlists']['items'].map((data, index) => {
                                        return(
                                            // console.log(data)
                                            <div className="items" key={index}>


                                                <img src={data['images'][0]['url']}></img>
                                                <p key={index}> {data['name']}</p>

                                            </div>
                                        )
                            })}
                                    </div>  

                                    <div className="flex">

                                        {/* {console.log(categories['categories'])} */}
                                    {categories['categories']['items'].map((data, index) => {
                                        return(
                                            <div className="items" key={index}>
                                                <img src={data['icons'][0]['url']}></img>
                                                <p key={index}> {data['name']}</p>
                                            </div>
                                        )
                            })}
                                         </div>
                                    </div> 

                            

                            
                            
                            )} 
            
            
        </div>
    )
}

export default Home;