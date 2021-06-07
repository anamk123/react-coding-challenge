import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Playlist from './components/playlist';
import Header from './components/header';
function App() {
  return (
    <div className="App">
            <Header></Header>

            <BrowserRouter>

     
      <Switch>
      <Route component={Home} path="/" exact />    
      <Route component={Playlist} path="/playlist"/>    

        </Switch>
      </BrowserRouter>

        <body className="">
          
        
        </body>

    </div>
   
  );
}

export default App;
