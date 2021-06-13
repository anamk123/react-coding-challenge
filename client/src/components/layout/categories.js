import axios from "axios";
import React, { useState, useEffect } from "react";

function Categories(props){
    
    const [categories, setCategories] = useState("");
    

      useEffect(() => {
        axios.get('http://localhost:4000/playlist/categories/')
        .then(response => setCategories(response.data));
      }, [setCategories]);

return(

    <>
<>
<div {...props.title}></div>

                            {!categories ?  (
                            
                            <div>
                                Loading {console.log(categories)}
                            </div>
                            ) : (
                                
                                <div className='flex' style={{display: 'flex', padding : '10px', marginLeft: '10px'}}>
                                    {console.log(categories)}
                                      {console.log(categories.categories.items)}
                                      {/* {console.log(featured.description)} */}

                                {categories.categories.items.map((data, index) => {
                                return(

                                    <div className="items" style={{margin: '15px'}} key={index}>

                                        <p key={index}><br></br>Playlist: {data['name']} <br></br> <img src={data.icons[0].url}></img> </p>
                                    </div>)
                                }
                                )}
                                </div>
                            )}

                                </>
   </>
)
      
}

export default Categories;