import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Playlist(props){

  const [nameText,  setNameTextState] = React.useState([""]);
  const [passText,  setPassTextState] = React.useState("");
  const [data, setData] = useState(null);

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
                                <div>
                                {data.map((data, index) => {
                                return(
                                   
                                    <div className="items" key={index}>
                                      
                                        <p key={index}><br></br>Playlist: {data['playlist_name']} <br></br> Img: {data['playlist_image']}</p>
                                    </div>)
                                }
                                )}
                                </div>
                            )}
                                
                                </>
    )
}
        
     
                                
    
    


export default Playlist;