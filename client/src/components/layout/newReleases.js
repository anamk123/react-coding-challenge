import axios from "axios";
import React, { useState, useEffect } from "react";

function NewReleases(props){
    
    const [newReleases, setNewReleases] = useState("");
 
    
      

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/newreleases/')
        .then(response => setNewReleases(response.data));
      }, [setNewReleases]);

return(

    <>
<>
<div ></div>

                            {!newReleases ?  (
                            
                            <div>
                                Loading
                            </div>
                            ) : (
                                <div className='flex' style={{display: 'flex', padding : '10px', marginLeft: '10px'}}>
                                      {console.log(newReleases)}
                                      {/* {console.log(newReleases.description)} */}

                                {  newReleases.albums.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} key={index}>

                                        <p key={index}><br></br>Playlist: {data.name} <br></br> <img src={data.images[0].url}></img> </p>
                                    </div>)
                                }
                                )}
                                </div>
                            )}

                                </>
   </>
)
      
}

export default NewReleases;