import { Button } from "@material-ui/core";
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
        
        console.log(e.target.src);
        setImage(e.target.src);
      }

      const  submitForm = e => {


        const newPlaylist ={

          playlist_image: image,
          playlist_name: 'testing'

         }

         axios.post('http://localhost:4000/playlist/add', newPlaylist)

         console.log(image);
         if(image){ axios.post('http://localhost:4000/playlist/add', newPlaylist)
         .then(res => console.log(res.data))
        //  .then(history.push("/users"));
       }

       else ( alert('please select an album') && e.preventDefault() )
      }

return(

    <>


                            {!featured ?  (
                            
                            <div>
                                Loading
                            </div>
                            ) : (
<>

                                <div className='flex' style={{background : 'grey'}}>
                                  <h2> Featured Playlists</h2>
                                      {console.log(featured)}
                                      {/* {console.log(featured.description)} */}
                                      {/* <input type='hidden' value={name}></input> */}
                                   <input type='hidden' value={image}></input>

                                {featured.playlists.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} name={data.name} src={data.images[0].url} key={index} onClick={ e => handleInputChange(e)}>

                                        <p key={index}><br></br> <img src={data.images[0].url}></img> <br></br> {data.name}  </p>

                                    </div>)
                                }
                                )}
                                </div>

                              <Button  variant="contained" color="secondary" className="btn"  onClick={e => submitForm(e)}>Add to playlist</Button> 
                              </>

                                
                            )}


   </>
)
      
}

export default FeaturedPlaylist;