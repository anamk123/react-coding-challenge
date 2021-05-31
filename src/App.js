import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
            <BrowserRouter>

     
      <Switch>
      <Route component={Home} path="/" exact />    
        </Switch>
      </BrowserRouter>

        <body className="">
          
        
        </body>

    </div>
   
  );
}

export default App;
