import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";


function Categories(props){
    
    const [categories, setCategories] = useState("");
    const[name, setName] = useState("");
    const [image, setImage] = useState("")
    

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/categories/')
        .then(response => setCategories(response.data));
      }, [setCategories]);


      const handleInputChange = e => {
        
        console.log(e.target.src);
        // console.log(e.target.key);

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


                            {!categories ?  (
                            
                            <div>
                                Loading 
                            </div>
                            ) : (
<>
                                
                                <div className='flex' style={{display: 'flex', padding : '10px', marginLeft: '10px'}}>
                                  <h2>Categories</h2>
                                  {/* <input type='' value=""></input> */}
                                   <input type='hidden' value={image}></input>
                                {categories.categories.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} key={data['name']} id={data['name']} value={data.icons[0].url} onClick={ e => handleInputChange(e)} >

                                        <p key={index}><br></br> <img src={data.icons[0].url}></img> <br></br> {data['name']} </p>
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

export default Categories;