import axios from "axios";
export const GET_GENRES = "GET_GENRES";
export const GET_ALLVIDEOGAMES = "GET_ALLVIDEOGAMES";
export const CREATE_VIDEOGAMES = "CREATE_VIDEOGAMES";
export const ORDER_GAMES = "ORDER_GAMES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_NAME = "FILTER_NAME";

//export const FILTER_BY_GENRES = "FILTER_BY_GENRES";

//import { GET_GENRES,GET_ALLVIDEOGAMES,CREATE_VIDEOGAMES,ORDER_GAMES,GET_PLATFORMS,FILTER_GENRES} from "./actions";

//export const GET_PLATFORMS = "GET_PLATFORMS";

export const getGenres = () => {
  return async function (dispatch) {
      const response = (await axios.get(`http://localhost:3001/genres`)).data
      return dispatch({
        type: GET_GENRES, 
        payload: response})
  }
}
export function getAllGames(){
  return async function(dispatch){  //despues camabiar el puerto a 3001
      const allGames = await axios.get("http://localhost:3001/videogames")
      .catch(error => alert(error.response.data))
      return dispatch({
          type:GET_ALLVIDEOGAMES,
          payload: allGames.data                     
      }) 
  }
}

export const orderxGames = (order) => { return { type: ORDER_GAMES, payload: order } }
export const filterGenre = (filter) => { return { type: FILTER_GENRES, payload: filter } }
export const filterOrigin = (filter) => { return { type: FILTER_ORIGIN, payload: filter } }
export const filterName = (filter) => { return { type: FILTER_NAME, payload: filter } }
/*export function getAllGames() {

  let url = `http://localhost:3001/videogames`;
  const response = axios.get(url);

  return response;
}*/


export function getGameById(id) {

  let url = `http://localhost:3001/videogames/` + id;

  const response = axios.get(url);

  return response;
}

export function getGameByName(name) {

  let url = `http://localhost:3001/videogames/name/` + name;
  const response = axios.get(url);

  return response;
}

export function getAllGenres() {
console.log("consigue todos los getAllGenres");
  let url = `http://localhost:3001/genres`;
  const response = axios.get(url);

  return response;
}

// export function createGames (videogame) {
//   /*return function () {
//     axios.post("http://localhost:3001/videogames", videogame)
//       .catch((error) => alert("The game could not be created: it doesn't meet the validation requirements."))
//   }*/
// console.log("videogame a crear");
//   let url = `http://localhost:3001/videogames`+videogame;
//   const response = axios.post(url);

//   return response;
// }
export const createGames = (videogame) =>{
  console.log("videogame a crear");
  console.log(videogame);
  // return function() {
  //     axios.post("http://localhost:3001/videogames", videogame)     
  //     .catch((error)=> alert("The game could not be created: it doesn't meet the validation requirements."))
  // }
  /*return async function(){
    await axios.post("http://localhost:3003/videogames/", videogame)
     .then(response => alert(response.data))
     .catch(error => alert(error.response.data))
 }*/
 let url = `http://localhost:3001/videogames`;
 const response = axios.post(url,videogame);

 return response;
}
export const filterGenres = (filtrogenres) => {
  let url = `http://localhost:3001/videogames/genres/` + filtrogenres;
  const response = axios.get(url);

  return response;
};

export const getPlatforms = () => {
  return async function (dispatch) {
      const response = (await axios.get(`http://localhost:3001/platforms`)).data
      return dispatch({
        type: GET_PLATFORMS, 
        payload: response})
  }
}

export function getAllPlatforms() {

  let url = `http://localhost:3001/platforms`;
  const response = axios.get(url);

  return response;
}