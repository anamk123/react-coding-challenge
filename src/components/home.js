import React, {useState, useEffect} from "react";
import axios from 'axios';



function Home(props){
    const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
    const spotifySecret = process.env.REACT_APP_CLIENT_SECRET;

    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifySecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          setToken(tokenResponse.data.access_token);
    
          axios('https://api.spotify.com/v1/browse/new-releases?country=NZ&limit=10&offset=5'
            , {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
          })
          .then(response => setData(response.data));
          
        });
    
      }, [spotifyClientId, spotifySecret]);


    return(
        <div>
              {!data ?  (
                            <div>
                                Loading
                            </div>

                            ) : (
                            
                            <div className="holdingContainer">
                              
                               {data['albums']['items'].map((data, index) => {
                                return(
                                    <>
                                    <div className="items" key={index}>
                                        <img src={data['images'][1]['url']}></img>
                                        <p key={index}>{data['name']} <br></br> {data['artists'][0]['name']} {console.log(data)}</p>

                                    </div>

                                </>
                                
                                
                                
                                
                                )
                    })}
                            </div>
                            )} 
            
            
        </div>
    )
}

export default Home;