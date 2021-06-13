import axios from "axios";
import React, { useState, useEffect } from "react";

function FeaturedPlaylist(props){
    
    const [featured, setFeaturedPlaylist] = useState("");
    const[name, setName] = useState("");
    const [image, setImage] = useState("")
    
      

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/featured/')
        .then(response => setFeaturedPlaylist(response.data));
      }, [setFeaturedPlaylist]);

      const handleInputChange = e => {
        
        console.log(e.target.name);

        setName(e.target.name);
        setImage(e.target.value);
      }

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
                                      {/* {console.log(featured.description)} */}

                                {featured.playlists.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} name={data['description']} key={index} onChange={ e => props.handleInputChange(e)}>

                                        <p key={index}><br></br>Playlist: {data['description']} <br></br> <img src={data.images[0].url}></img> </p>
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