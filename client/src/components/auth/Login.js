import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button} from '@material-ui/core';

function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };

      // await axios.post("http://localhost:5000/auth/login", loginData);
      await axios.post(
        "http://localhost:4000/auth/login",
        loginData
      );
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{marginLeft : '40%', marginTop : '10%'}}>
      <h1>Log in to your account</h1>
      <form onSubmit={login}>
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
        <br></br><Button style={{marginTop : '2%'}} variant="contained" color="primary" type="submit">Log in</Button>

      </form>
    </div>
  );
}

export default Login;
