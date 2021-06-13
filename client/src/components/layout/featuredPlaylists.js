import axios from "axios";
import React, { useState, useEffect } from "react";

function FeaturedPlaylist(props){
    
    const [featured, setFeaturedPlaylist] = useState("");
 
        

      

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/featured/')
        .then(response => setFeaturedPlaylist(response.data));
      }, [setFeaturedPlaylist]);

return(

    <>
<>
<div {...props.title}></div>

                            {!featured ?  (
                            
                            <div>
                                Loading
                            </div>
                            ) : (
                                <div className='flex' style={{display: 'flex', padding : '10px', marginLeft: '10px'}}>
                                      {console.log(featured)}
                                      {console.log(featured.description)}

                                {featured.playlists.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} key={index}>

                                        <p key={index}><br></br>Playlist: {data['description']} <br></br> <img src={data.images[0].url}></img> {console.log(data.images[0].url)}</p>
                                    </div>)
                                }
                                )}
                                </div>
                            )}

                                </>
   </>
)
      
}

export default FeaturedPlaylist;