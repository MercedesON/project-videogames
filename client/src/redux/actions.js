import axios from "axios";


export const GET_ALLVIDEOGAMES = "GET_ALLVIDEOGAMES";
export const CREATE_VIDEOGAMES = "CREATE_VIDEOGAMES";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
//export const GET_PLATFORMS = "GET_PLATFORMS";


/*export function getAllGames(){
  return async function(dispatch){  //despues camabiar el puerto a 3001
      const allGames = await axios.get("http://localhost:3001/videogames")
      .catch(error => alert(error.response.data))

      return dispatch({
          type:GET_ALLVIDEOGAMES,
          payload: allGames.data                     
      }) 
  }
}*/
export function getAllGames() {

  let url = `http://localhost:3001/videogames`;
  const response = axios.get(url);

  return response;
}


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

export function getAllPlatforms() {

  let url = `http://localhost:3001/platforms`;
  const response = axios.get(url);

  return response;
}