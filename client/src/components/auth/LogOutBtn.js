import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Button} from "@material-ui/core"

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    // await axios.get("http://localhost:5000/auth/logout");
    await axios.get(
      "http://localhost:4000/auth/logout"
    );
    await getLoggedIn();
    history.push("/");
  }

  return <Button style={{marginTop : '2%'}} variant="contained" color="danger" onClick={logOut}>Log out</Button>;
}

export default LogOutBtn;
