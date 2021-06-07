import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Playlist(props){

  const [nameText,  setNameTextState] = React.useState([""]);
  const [passText,  setPassTextState] = React.useState("");
  const [token, setToken] = useState(null);
  const [newReleaseData, setReleaseData] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(null);
  const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
  const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;

    useEffect(() => {
        axios.get('http://localhost:4000/playlist/')
        .then(response => setData(response.data))
            .catch(function (error){
                console.log(error);
            })
      });


    
  


    return(
                                <> 
                            {!data ?  (
                            <div>
                                Loading
                            </div>
                            ) : (
                                <div className='flex'>
                                        {/* {console.log(categories)} */}
                                {data.map((data, index) => {
                                return(
                                   
                                    <div className="items" key={index}>
                                        
                                        <p key={index}><br></br> {data['playlist_name']} <br></br><img src={data['playlist_image']} ></img></p>
                                    </div>)
                                }
                                )}
                                </div>
                            )}
                                
                                </>
    )
}
        
     
                                
    
    


export default Playlist;