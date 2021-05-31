import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/home';
;



function App() {
  return (
    <div className="App">
       <BrowserRouter>

      {/* <header >
      <Header/>  
      </header> */}
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
