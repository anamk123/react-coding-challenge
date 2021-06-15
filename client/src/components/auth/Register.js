import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button} from "@material-ui/core"


function Register() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        username,
        password,
      };

      // await axios.post("http://localhost:5000/auth/", registerData);
      await axios.post(
        "http://localhost:4000/auth",
        registerData
      );
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
       <div style={{marginLeft : '40%', marginTop : '10%'}}>
    
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="User"
          onChange={(e) => setUser(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        
        <br></br><Button style={{marginTop : '2%'}} type="submit"  variant="contained" color="primary" >Register</Button>
      </form>
    </div>
  );
}

export default Register;
