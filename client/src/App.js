import './App.css';
//import { Routes, Route } from "react-router-dom";
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

//import Favorites from "./components/Favorites";*/

function App() {
  /*return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Routes>
        <Route path="/" element={<Login login={login} />}></Route> 
        <Route path="/home" element={<Cards onClose={onClose} />}></Route> 
        <Route path="/about" element={<About />}></Route>
       
      </Routes>
    </div>
  );*/
  
  return (
    <BrowserRouter>
    <div>
      {/* <h1>Henry Videogames</h1> */}
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home}/>  
        <Route path="/detail/:id" component={Detail}/>
        <Route path="/form" component={Form} />       
        </Switch>
    </div>    
    </BrowserRouter>    
    )
}
export default App;
