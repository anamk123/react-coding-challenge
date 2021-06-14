import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

function NewReleases(props){
    
    const [newReleases, setNewReleases] = useState("");
    const [image, setImage] = useState("")

 
    
      

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/newreleases/')
        .then(response => setNewReleases(response.data));
      }, [setNewReleases]);


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


                            {!newReleases ?  (
                            
                            <div>
                                Loading
                            </div>
                            ) : (
                              <>

                                <div className='flex' style={{background : 'grey'}}>
                                                                      <h2> New Releases</h2>

                                    {/* <input type='hidden' value=""></input> */}
                                   <input type='hidden' value={image}></input>
                                {  newReleases.albums.items.map((data, index) => {
                                return(
                                    
                                    <div className="items" style={{margin: '15px'}} key={index} onClick={ e => handleInputChange(e)}>

                                        <p key={index}><br></br> <img src={data.images[0].url}></img><br></br> {data.name}  </p>
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

export default NewReleases;