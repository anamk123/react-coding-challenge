import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

// import React, { useState, useEffect } from "react";



axios.defaults.withCredentials = true;

function App() {
//   useEffect(() => {
//     keepTheme();
// })
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
