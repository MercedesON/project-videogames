import './App.css';
//import { Routes, Route } from "react-router-dom";
//import React from 'react'
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
//import { useEffect, useState } from 'react';
import { useEffect} from 'react';
import { getGenres ,getPlatforms} from './redux/actions';
/**jjjjjjjjjj */
//import NavBar from "./components/NavBar/NavBar.jsx";
//import { Route, useLocation} from "react-router-dom";
import { Route} from "react-router-dom";


//import Favorites from "./components/Favorites";*/

function App() {
  const allGenres = useSelector((state)=> state.genresGames);
  const allPlatforms = useSelector((state)=> state.platformsGames);
 // const [currentPage,setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  
  useEffect(() => {  
    dispatch(getGenres());
  },[dispatch])

  useEffect(() => {  
    dispatch(getPlatforms());
  },[dispatch])

//  const location = useLocation();
  return (
    
    <div>
      {/* <h1>Henry Videogames</h1> */}
        
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home}/>  
        <Route path="/detail/:id" component={Detail}/>
        {/* <Route path="/form" component={Form} />        */}
        <Route path="/Form">
        <Form allGenres={allGenres}  allPlatforms={allPlatforms} />
      </Route>

        
    </div>    
    )
}
export default App;
