const axios = require("axios");
require("dotenv").config();
const {Genres} = require("../db.js");

const URL = process.env.URL;
const API_KEY = process.env.API_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const STATUS_OK = 200;
const STATUS_ERROR = 404;


async function getAllGenres(req, res) {
  console.log("carga-getAllGenres");
  try {
      let genresBDFin=[];
      let genresBD = await Genres.findAll({          
      });
       
      if(genresBD.length>0){
          genresBD.forEach((vg) => {
            let genres_bd = {
              id: vg.id,
              name: vg.name
            };
            genresBDFin.push(genres_bd);
            // console.log("genresBDFin");
            // console.log(genresBDFin);
          });
      }else{
          const response = await axios.get(`${URL}/genres?key=${API_KEY}`);             
          // Hacemos un map y solo traemos el nombre de cada género
          const allGenres = response?.data?.results?.map((genre)=>{
                 return{
                  id:genre.id,
                  name:genre.name
                 }
          })
          // el bulkCreate => permite pasarle un array de objetos y los crea todos juntos en la Base de Datos
          await Genres.bulkCreate(allGenres);            
          
          genresBD = await Genres.findAll({          
          });
         
          if(genresBD.length>0){
            genresBD.forEach((vg) => {
              let genres_bd = {
                id: vg.id,
                name: vg.name
              };
              genresBDFin.push(genres_bd);
              // console.log("genresBDFin");
              // console.log(genresBDFin);
            });
          }
        }
        res.status(STATUS_OK).json(genresBDFin);
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

module.exports = {
  getAllGenres
};
