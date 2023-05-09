import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { useDispatch } from "react-redux";
//import { clearState, getGames, getPage } from "../../redux/actions";
//import { useDispatch } from "react-redux";
import { getGameByName } from "../../redux/actions";


export default function SearchBar({ setCurrentPage }) {
    const [name, setName] = useState("");

    console.log("name");
    console.log(name);

  
    //const dispatch = useDispatch();

    const handleChange = (event) => {
        setName(event.target.value);        //Guardo el valor del input en un estado local.
    }
  
    const onSearch = (name) => {
       /* console.log("onSearch");  

        if(name!=""){
            console.log("onSearch-name!=''");
            dispatch(getGameByName(name));  //Busco el juego por name.
            setCurrentPage(1);
      }*/
    }

    return (
        <div>
        <input className={styles.searchInput} onChange={handleChange} type="search" name="search" value={name} />
        <button className={styles.searchButton} onClick={() => onSearch(name)}>Search 🔎</button>
      </div>
    );
}