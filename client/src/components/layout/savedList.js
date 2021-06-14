import axios from "axios";
import React, { useState, useEffect } from "react";

 function SavedPlaylists(props) {

    const [saved, setSaved] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/playlist/saved/')
        .then(response => setSaved(response.data));
        
            
            
    },[setSaved]);



    return(

        <div>


            {!saved ?  (
                            
                            <div>
                                Loading
                            </div>
                            ) : (
                                <div className='flex' style={{display: 'flex', padding : '10px', marginLeft: '10px'}}>
                                    {console.log(saved[0])}
                        {/* <p  ><br></br>Playlist: {saved.map}  </p> */}

                                        {saved.map((data, index) => {

                                           return (
                                               <div className='items'>
                                               <p>{data.playlist_name}</p>
                                               <img src={data.playlist_image}></img>
                                               </div>
                                           )
                                           
                                           })};



                                </div>
                                
                            )}
        </div>

    )
}

export default SavedPlaylists;