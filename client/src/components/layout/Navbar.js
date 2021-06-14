import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <AppBar position="static">
  <Toolbar>
  <Button color="inherit"><Link to="/">Home</Link></Button>
  {loggedIn === false && (
        <>
          <Button color="inherit"><Link to="/register">Register</Link></Button>
          <Button color="inherit"><Link to="/login">Login</Link></Button>
        </>
      )}
      {loggedIn === true && (
        <>
          <Button color="inherit"><Link to="/saved">Saved Playlists</Link></Button>
          <Button color="inherit"><LogOutBtn/></Button>
        </>
      )}
  </Toolbar>
</AppBar>
    // <div>
    //   <Link to="/">Home</Link>
    //   {loggedIn === false && (
    //     <>
    //       <Link to="/register">Register</Link>
    //       <Link to="/login">Log in</Link>
    //     </>
    //   )}
    //   {loggedIn === true && (
    //     <>
    //       <Link to="/saved">Customers</Link>
    //       <LogOutBtn />
    //     </>
    //   )}
    //     <div>
    //   </div>
    // </div>
  
  );
}

export default Navbar;
