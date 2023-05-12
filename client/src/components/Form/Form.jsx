import styles from "./Form.module.css";
//import validation from "./validation";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllGenres, getAllPlatforms,createGames } from "../../redux/actions";
//import { MultiSelect } from "react-multi-select-component";

//const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//const regexPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/;


export default function Form({ formCreate, genres, platforms }) {
  const [allGenres, setDataGeneres] = useState([]);
  const [allPlatforms, setDataPlatforms] = useState([]);
  let allPlatformsSelect="All";
  let allGenresSelect=[];
  
  useEffect(() => {

    if (!genres) {
      getAllGenres().then((response) => {
        setDataGeneres(response.data);
      });
    }
    if (!platforms) {
      getAllPlatforms().then((response) => {
        setDataPlatforms(response.data);
      });
    }
  }, [genres, platforms]);

  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
    genres: "",  

  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
    genres: "",
  });
  const AddSelectGenres = (event) => {   
    const isChecked = event.target.checked;
    const Value = event.target.value;
    if(isChecked){   
      console.log("isChecked");  
      allGenresSelect.push(Value);
      inputs.genres=allGenresSelect;
    }else{
      console.log("desscheck");
      allGenresSelect=allGenresSelect.filter((g) => g !== Value);
      inputs.genres=allGenresSelect;
    }
}

const handleSelectPlatform =(event)=>{
  //event.preventDefault();
  allPlatformsSelect=event.target.value;
  console.log("allPlatformsSelect-allPlatformsSelect");
  console.log(allPlatformsSelect);
  inputs.platforms=allPlatformsSelect;
 
}

  function validate(inputs) {
    console.log("validate-inputs"); 
    console.log(inputs); 
    const errors = {};
    if (!inputs.name) {
      errors.name = "Ingrese Nombre de videogame";
    } else if (!inputs.image) {
      errors.image = "Ingrese la ruta de la imagen del videojuego";
    } else if (!inputs.description) {
      errors.description = "Ingrese Descripcion de videogame";
    }else if (!inputs.released) {
      errors.released = "Ingrese la fecha del videogame";
    } else if (!inputs.rating) {
      errors.rating = "Ingrese rating del videogame";
    }/*else if(allGenresSelect.length===0){
      errors.genres="Selecciona al menos un género";
    }else if(allPlatformsSelect==="All")*/
    errors.platforms="Selecciona al menos una plataforma";
    return errors;
  }

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
      [e.target.image]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.platforms]: e.target.value,
      [e.target.released]: e.target.value,
      [e.target.rating]: e.target.value,
      [e.target.genres]: e.target.value,

    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
        [e.target.image]: e.target.value,        
      [e.target.description]: e.target.value,
      [e.target.platforms]: e.target.value,
      [e.target.released]: e.target.value,
      [e.target.rating]: e.target.value,
      [e.target.genres]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    
      e.preventDefault();
      const aux = Object.keys(errors);      
      console.log("submit-aux");
      console.log(aux.length);
      if (aux.length === 0) {
        formCreate(inputs);
        setInputs({
          name: "",
          image: "",
          description: "",
          platforms: "",
          released: "",
          rating: "",
          genres: "",

        });
        setErrors({
          name: "",
          image: "",
          description: "",
          platforms: "",
          released: "",
          rating: "",
          genres: "",
        });
       
      } else {        
        console.log("submit-alerta");      
        if (!inputs.name) {
          return alert("Ingrese Nombre de videogame");
        } else if (!inputs.image) {
          return alert("Ingrese la ruta de la imagen del videojuego");
        } else if (!inputs.description) {
          return alert("Ingrese Descripcion de videogame");
        }else if (!inputs.released) {
          return alert("Ingrese la fecha del videogame");
        } else if (!inputs.rating) {
          return alert("Ingrese rating del videogame");
        }else if(allGenresSelect.length===0){
            return alert("Selecciona al menos un género");
        }else if(allPlatformsSelect==="All")
            return alert("Selecciona al menos una plataforma");

            let resp="";
            createGames(inputs).then((response) => {                            
                for( var message in response.data){                  
                  for(let r of response.data[message]){                    
                    resp+=r;
                  }
                }                
                alert(resp);      
            });
            
      }
    
  }
   return (    
    <div>
      {/* {showSuccessMessage && (
        <div className={styles.successMessage}>
          The videogame was created successfully.
        </div>
      )} */}
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
        <label htmlFor="titulo" className={styles.Titulo}>CREATE VIDEOGAME </label>
        <label htmlFor="name">Name: </label>
        <input className={styles.inputForm}  type="text" name="name" onChange={handleChange} />
        <p className={styles.danger}>{errors.name}</p>        
        <label htmlFor="image" >Image URL: </label>
        <input className={styles.inputForm} type="url" name="image" onChange={handleChange}></input>
        <p className={styles.danger}>{errors.image}</p>        
        <label htmlFor="description" >Description:</label>
        <input className={styles.inputForm} type="text" name="description" onChange={handleChange} ></input>
        <p className={styles.danger}>{errors.description}</p>        
        <label htmlFor="platforms" >Platforms:</label>             
        <br />
        <select className={styles.SelecPlatform} onChange={handleSelectPlatform}>                  
                <option value="All" >Todos</option>
                    {
                        allPlatforms?.map((pl)=>(
                            <option key={pl.id} value={pl.name}>{pl.name}</option>
                        ))
                    }
        </select>   
        {/* <p className={styles.danger}>{errors.platforms}</p>        */}
        <br />       
        <br />   
        <br /> 
        <label htmlFor="released" className={styles.label}>Released:</label>
        <input className={styles.inputForm} type="date" name="released" onChange={handleChange} ></input>
        <p className={styles.danger}>{errors.released}</p>        
        <label htmlFor="rating" className={styles.label}>Rating</label>
        <input className={styles.inputForm}
          type="number"
          name="rating"
          // onBlur={(event) => ratingInCero(event)}
          onChange={handleChange} step="0.01"></input>
        <p className={styles.danger}>{errors.rating}</p>
        <br />
        <label htmlFor="genres" className={styles.label}>Choose your favorites Genres:</label>
        <br />
        <div className={styles.containercheckbox}>
        {
            allGenres?.map((gen)=>(
                  <div>
                    <input className={styles.checkbox} type="checkbox" onClick={(event) => AddSelectGenres(event)} value={gen.id}/>                  
                    <label className={styles.Labelcheckbox} key={gen.name} htmlFor={gen.name}>{gen.name}</label>
                  </div>      
            ))
        }
        </div>        
        <br />
        <button className={styles.ButtonCreate} type="submit">Save</button>
      </form>
    </div>
  );
}
