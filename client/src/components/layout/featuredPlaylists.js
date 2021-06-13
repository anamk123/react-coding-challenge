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
        console.log(e.target.name);


        setName(e.target.name);
        setImage(e.target.src);
      }

      const  submitForm = e => {


        const newPlaylist ={

          playlist_image: image,

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
                                      <input type='text' value={name}></input>
                                   <input type='text' value={image}></input>

                                {featured.playlists.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} name={data.name} src={data.images[0].url} key={index} onClick={ e => handleInputChange(e)}>

                                        <p key={index}><br></br>Playlist: {data.name} <br></br> <img src={data.images[0].url}></img> </p>
                                    </div>)
                                }
                                )}
                                </div>
                                
                            )}
             <button  variant="contained" color="secondary"   onClick={e => submitForm(e)}>Add to playlist</button> 


                                </>
   </>
)
      
}

export default FeaturedPlaylist;