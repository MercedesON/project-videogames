import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";
//import Detail from "../Detail/Detail";
//import {  useDispatch, useSelector } from "react-redux";
//import { useSelector } from "react-redux";
//import { addFav, removeFav } from "../../redux/actions";
//import { useState } from "react";
//import { useEffect } from "react";

export default function Card(props) {
  const { id, name, image ,genres} = props;

  return (
    <div className={style.card}>
      <div className={style.head_card}>
        {/* {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )} */}
        {/* <button onClick={superClouse}>X</button> */}
      </div>
      <Link className={style.link} to={`/detail/${id}`}>
      <h1>{name}</h1>
      </Link>        
      <img className={style.imgCard} src={image} alt={name} />        
      <h2>Género: {genres}</h2>
      
    </div>
  );
}


