import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Customers from "./components/customers/Customers";
import Navbar from "./components/layout/Navbar";
import AuthContext from "./context/AuthContext";
import Home from './components/layout/Home';
import Featured from "./components/layout/featuredPlaylists";
import Categories from "./components/layout/categories";
import SavedPlaylists from "./components/layout/savedList";

import NewReleases from "./components/layout/newReleases";


function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/featured">
          <Featured/>
        </Route>
        <Route exact path="/categories">
          <Categories/>
        </Route>
        <Route exact path="/newrelease">
          <NewReleases/>
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/saved">
              <SavedPlaylists />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
