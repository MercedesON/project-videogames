import styles from "./Form.module.css";
//import validation from "./validation";
//import { useDispatch, useSelector } from "react-redux";
//import { useState, useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
//import { getAllGenres, getAllPlatforms,createGames } from "../../redux/actions";
import { createGames } from "../../redux/actions";
//import { MultiSelect } from "react-multi-select-component";

//const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//const regexPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/;

// const Form = ({allGenres}) => {
//   const allVideogames = useSelector((state) => state.allGames);
//   const dispatch = useDispatch();

//   const [gameData,setGameData] = useState({
//       name:"",
//       image:"",
//       description:"",
//       platforms: [],
//       released: "",
//       rating: 0,
//       genres: []
//   })

//   const [errors,setErrors] = useState({
//       name:"Agregar información.",
//       image:"Agregar información.",
//       description:"Agregar información.",
//       released: "Agregar información.",
//       rating: "Agregar información.",
//       platforms: "Agregar información.",
//       genres: "Agregar información."
//   })

//   const handleChange = (event) => {
//       const prop = event.target.name;
//       const value = event.target.value;

//       setGameData({...gameData, [prop]: value})
//       //setErrors(validation({...gameData, [prop]: value}, allVideogames))
//   }

//   const AddPlatform = (event) => {
//       const isChecked = event.target.checked;
//       const Value = event.target.value;
//       if(isChecked){
//           setGameData({ ...gameData, platforms: [...gameData.platforms, event.target.value] })
//           //setErrors(validation({ ...gameData, platforms: [...gameData.platforms, event.target.value]}, allVideogames))
//       }else{
//           setGameData({...gameData, platforms: gameData.platforms.filter((plat) => plat !== Value)})
//           //setErrors(validation({...gameData, platforms: gameData.platforms.filter((plat) => plat !== Value)},  allVideogames))
//       }
//   }
//   const AddGenres = (event) => {
//       const isChecked = event.target.checked;
//       const Value = event.target.value;
//       if(isChecked){
//           setGameData({...gameData, genres: [...gameData.genres, event.target.value] })
//           //setErrors(validation({...gameData, genres: [...gameData.genres, event.target.value] }, allVideogames))
//       }else{
//           setGameData({...gameData, genres: gameData.genres.filter((gen) => gen !== Value)})
//           //setErrors(validation({...gameData, genres: gameData.genres.filter((gen) => gen !== Value)}, allVideogames))
//       }
//   }

//   const handleSubmit = (event) => {
//       if(gameData.name === "") event.preventDefault();      //Sirve para que la página no haga refresh por default.
//       dispatch(createGames(gameData));
//   }
//   const ratingInCero = (event) =>{
//       if(!gameData.rating) event.target.value = 0;   
//   }
  
//   return(
//       <div className={style.globalCont}>
//           <div className={style.contForm}>
//               <h2 className={style.title}>🕹️ ADD YOUR GAME 🕹️</h2>
              
//               <form onSubmit={handleSubmit} className={style.formData}>
//                   <label htmlFor="name">Name</label>
//                   <input type="text" name="name" onChange={handleChange} value={gameData.name}/>

//                   <label htmlFor="image">Image URL:</label>
//                   <input type="url" name="image" onChange={handleChange} value={gameData.image}></input>

//                   <label htmlFor="description">Description:</label>
//                   <textarea name="description" onChange={handleChange} value={gameData.description}></textarea>

//                   <label htmlFor="platforms">Platforms:</label>
//                   {/* <div className={style.contPlatforms}>
//                       {allPlatforms?.map((plat)=>{
//                           return (<div>
//                               <input type="checkbox" onClick={(event) => AddPlatform(event)} value={plat}/>
//                               <label key={plat} htmlFor={plat}>{plat}</label>
//                           </div>)     
//                       })}
//                   </div> */}

//                   <label htmlFor="released">Released:</label>
//                   <input type="date" name="released" onChange={handleChange} value={gameData.released}></input>
                  
//                   <label htmlFor="rating">Rating</label>
//                   <input 
//                       type="number"
//                       name="rating" onBlur={(event)=> ratingInCero(event)}
//                       onChange={handleChange} step="0.01"
//                       value={gameData.rating}></input>

//                   <label htmlFor="genres">Choose your favorites Genres:</label>      
//                   <div className={style.contGenres}>
//                       {allGenres?.map((genre)=>{
//                               return (<div>
//                                   <input type="checkbox" onClick={(event) => AddGenres(event)} value={genre}/>
//                                   <label htmlFor={genre}>{genre}</label>
//                               </div>)     
//                           })}
//                   </div>
//                   {errors.flag === true? <button disabled>Create Game</button> : <button>Create Game</button>}
//               </form>
//           </div>

//           <div className={style.infoValidation}>
//               <div className={style.titleInfo}>
//                   <h2>📌 Validaciones:</h2>
//                   <p>- Deberán cumplirse las condiciones de validación para almacenar el nuevo videojuego
//                       en la base de datos, de lo contrario, los datos no se guardarán.</p>
//               </div>
//               <ul className={style.uList}>
//                   <li className={errors.name? style.errorName: style.validName} >Name: {errors.name? errors.name : "Información correcta."}</li>
//                   <li className={errors.image? style.errorImg: style.validImg}>Image: {errors.image? errors.image : "Información correcta."}</li>
//                   <li className={errors.description? style.errorDes : style.validDes}>Description: {errors.description? errors.description : "Información correcta."}</li>
//                   <li className={errors.released? style.errorRel: style.validRel}>Released: {errors.released? errors.released : "Información correcta."}</li>
//                   <li className={errors.rating? style.errorRat: style.validRat}>Rating: {errors.rating? errors.rating : "Información correcta."}</li>
//                   <li className={errors.genres? style.errorGen: style.validGen}>Genres: {errors.genres? errors.genres : "Información correcta."}</li>
//                   <li className={errors.platforms? style.errorPlat: style.validPlat}>Platforms: {errors.platforms? errors.platforms : "Información correcta."}</li>
//               </ul>
//           </div>
//       </div>
//   )
// }

// export default Form;

// //export default function Form({ formCreate, genres, platforms }) {
  export default function Form({ allGenres ,allPlatforms}) {
    console.log("Entro a allGenres");
    console.log(allGenres);
  //const [allGenres, setDataGeneres] = useState([]);
  //const [allPlatforms, setDataPlatforms] = useState([]);
  let allPlatformsSelect="All";
  let allGenresSelect=[];
  
  /*useEffect(() => {

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
  }, [genres, platforms]);*/

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
        //formCreate(inputs);
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