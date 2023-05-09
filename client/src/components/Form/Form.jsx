import { useState, useEffect } from "react";
import styles from "./Form.module.css";
//import validation from "./validation";
//import { useDispatch, useSelector } from "react-redux";
import { createGames } from "../../redux/actions";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
//import ReactModal from 'react-modal';
import { getAllGenres, getAllPlatforms,createGames } from '../../redux/actions.js';

export default function Form() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setdescription] = useState('');
  const [platforms, setSelectedPlatforms] = useState('');
  const [release, setRelease] = useState('0');
  const [rating, setRating] = useState('0');
  const [genero, setSelectedGenero] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [allGenres, setDataGeneres] = useState([]);
  const [allPlatforms, setDataPlatforms] = useState([]);
  
  /*useEffect(() => {
    getAllGenres().then((response) => {
      setDataGeneres(response.data);
    });
    getAllPlatforms().then((response) => {
      setDataPlatforms(response.data);
    });

  },[])*/

  
  const resetForm = () => {
    setName('');
    setdescription('');
    setSelectedPlatforms('');
    setRelease('');
    setRating('0');
    setSelectedGenero('');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideogame = {
      name,
      description,
      platforms,
      release,
      image,
      rating,
      genero,
    };

    setShowModal(true);
    // Validar los campos del formulario
    const formErrors = {};

    if (!/^[a-zA-Z]+$/.test(name)) {
      formErrors.name = 'The name only can contain letters';
      //alert('The name only can contain letters');
    }

    if (!/^[0-9]+$/.test(rating)) {
      formErrors.rating = 'The rating score only can contain numbers';
    }

    if (Object.keys(formErrors).length > 0) {
      //setErrors(formErrors);
      return;
    }

    const videogameData = JSON.parse(localStorage.getItem('videogames')) || [];
    videogameData.push(newVideogame);
    localStorage.setItem('videogames', JSON.stringify(videogameData));
    try {
      const response = createGames(newVideogame);
      console.log(response);
      setShowSuccessMessage(true); // Muestra mensaje de éxito de envío de formulario.
      resetForm();
    } catch (error) {
      console.error(error);
    }

  };

const handleClickGenres =(event)=>{
    event.preventDefault()   
    
}
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleReleaseChange = (event) => {
    setRelease(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handlePlatformsChange = (event) => {
    setSelectedPlatforms(event.target.value);
  };

  const handleGeneroChange = (event) => {
    setSelectedGenero(event.target.value);
  };
 
  const ratingInCero = (event) => {
    if(!gameData.rating) 
    event.target.value = 0;   
  };
 

  return (
    <div>
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          The videogame was created successfully.
        </div>
      )}
      {/* <img src={Image} alt="fruits and vegetables" className={styles.formImageContainer}></img>  */}
      <ul id="Nav_menu">
        <li>
          <NavLink
            to="/home"
            className="Nav_link">
            🏡HOME
          </NavLink>
        </li>
      </ul>

      <form className={styles.formContainer} method='post' onSubmit={handleSubmit}>
        <br />
        <label htmlFor="name" className={styles.Titulo}>CREATE VIDEOGAME </label>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleNameChange} />
        <br />
        <label htmlFor="image" >Image URL: </label>
        <input type="url" name="image" onChange={handleImageChange}></input>
        <br />
        <label htmlFor="description" >Description:</label>
        <textarea name="description" onChange={handleDescriptionChange} ></textarea>
        <br />
        <label htmlFor="platforms" >Platforms:</label>
        {
            allPlatforms?.map((p) => (
              <button
                className={styles.buttonGenres}
                key={p.name}
                value={p.name}
                name="optionsGenres"
                onClick={(value) => handleClickGenres(value)}>{p.name}</button>
            
            ))
          }
        <br />
        <label htmlFor="released" className={styles.label}>Released:</label>
        <input type="date" name="released" onChange={handleReleaseChange} ></input>
        <br />
        <label htmlFor="rating" className={styles.label}>Rating</label>
        <input
          type="number"
          name="rating" onBlur={(event) => ratingInCero(event)}
          onChange={handleRatingChange} step="0.01"        ></input>
        <br />
        <label htmlFor="genres" className={styles.label}>Choose your favorites Genres:</label>
        <div className={styles.contGenres}>
        
          {
            allGenres?.map((genre) => (
              <button
                className={styles.buttonGenres}
                key={genre.name}
                value={genre.name}
                name="optionsGenres"
                onClick={(value) => handleClickGenres(value)}>{genre.name}</button>
            
            ))
          }

        </div>
        <br />
        <button className={styles.ButtonCreate} type="submit">Save</button>
      </form>
    </div>
  );
}