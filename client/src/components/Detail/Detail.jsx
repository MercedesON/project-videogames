import React, { useState, useEffect } from "react";
import style from "../Detail/Detail.module.css";
//import { NavLink} from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom";
//import axios from "axios";
import { Link} from 'react-router-dom/cjs/react-router-dom.min';
import { getGameById} from '../../redux/actions.js';

/*useEffect(() => {
  //if (filterOption === '' && recipeName === ''){
    getAllGames().then((response) => {
      setData(response.data);        
    });
    
  //}
}, [recipeName,filterOption]);*/

export default function Detail() {
  //console.log("Detail");
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    async function inEffect() {
      try {
        //const { data } = getGameById(id);
        // await axios(
        //   `http://localhost:3001/videogames/${id}`
        // );
        getGameById(id).then((response) => {
          setCharacter(response.data);        
        });
        if (character) {
          //Hay data
        } else {
          window.alert("No hay videojuegos con ese ID");
        }
      } catch (error) {
        console.log("videojuegos update in useeffect in component Detail", error);
      }
    }
    inEffect();
    return setCharacter({}); 
  }, [id]); 


  return (    
    <div  className={style.container}>      
    <Link
        to="/home"
        className={style.Nav_link}>
        🏡HOME
    </Link>
    <br />
    <label className={style.Titulo}>DETAIL VIDEOGAME </label> 
    <br />  
    <div className={style.detail}>
    <img className={style.imgCard} src={character.background_image} alt={character.name} />
    <h3>Id: {character.id}</h3>
    <h3>Nombre: {character.name}</h3>
    <h3>Rating: {character.rating}</h3>
    <h3>Generos: {character.generos}</h3>
    <h3>Platforms: {character.platform}</h3>
    <h3>Released: {character.released}</h3>
    </div>
    </div>
  );
}