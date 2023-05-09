const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const {Videogame,Videogame_Genres} = require("../db.js");

const URL = process.env.URL;
const API_KEY = process.env.API_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const STATUS_OK = 200;
const STATUS_ERROR = 404;

async function getGamesById(req, res) {
  try {
    const { idVideogame } = req.params;
    console.log("getGamesById-idVideogame");
    const promise1 = axios.get(`${URL}/games?key=${API_KEY}`);
    const promise2 = axios.get(`${URL}/games?key=${API_KEY}&page=2`);
    const promise3 = axios.get(`${URL}/games?key=${API_KEY}&page=3`);
    const promise4 = axios.get(`${URL}/games?key=${API_KEY}&page=4`);
    const promise5 = axios.get(`${URL}/games?key=${API_KEY}&page=5`);
    let Apiresult = {};
    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
      Apiresult = values[0].data.results.
        concat(values[1].data.results).
        concat(values[2].data.results).
        concat(values[3].data.results).
        concat(values[4].data.results);
    }, {
      function(err) {

        console.log(err);
      }
    });
    if (Apiresult) {
      let videogames = Apiresult.filter((vg) => vg.id == idVideogame);
      let videogame = {};
      let genresFilter = {};
      let nameFilter = "";
      let imgFilter = "";
      let idFilter = "";
      let ratingFilter = "";
      let platformsFilter = "";
      let releasedFilter = "";
      for (let dato in videogames) {
        // datos.resultado y datos.operaciones
        for (let i in videogames[dato]) {
          // Acceder a cada elemento de resultados y operaciones, según el primer ciclo
          //console.log(i);
          if (i == "id")
            idFilter = videogames[dato][i];

          if (i == "name")
            nameFilter = videogames[dato][i];

          if (i == "released")
            releasedFilter = videogames[dato][i];

          if (i == "genres")
            genresFilter = videogames[dato][i];

          if (i == "background_image")
            imgFilter = videogames[dato][i];

          if (i == "rating")
            ratingFilter = videogames[dato][i];

          if (i == "platforms")
            platformsFilter = videogames[dato][i];
        }
      }
      let conta = 0;
      let generos = "";
      if (genresFilter) {
        conta = 0;
        for (let dato in genresFilter) {
          if (conta == 0)
            generos += genresFilter[dato].name;
          else
            generos += "," + genresFilter[dato].name;
          conta += 1;
        }
      }
      let platform = "";
      conta = 0;
      for (var j = 0; j < platformsFilter.length; j++) {
        var vidgame = platformsFilter[j];
        for (var key in vidgame) {
          if (vidgame.hasOwnProperty(key)) {
            if (key == "platform") {
              if (platform == "")
                platform = vidgame[key].name;
              else
                platform += "," + vidgame[key].name;
            }
          }
        }
      }

      videogame = {
        id: idFilter,
        name: nameFilter,
        released: releasedFilter,
        background_image: imgFilter,
        genres: genresFilter,
        rating: ratingFilter,
        generos: generos,
        platforms: platformsFilter,
        platform: platform
      };
      return res.status(STATUS_OK).json(videogame);

    } else {
      res.status(STATUS_ERROR).json({ message: "videogames not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getGamesByName(req, res) {
  try {
    let { name } = req.params;
    name=name.toUpperCase();   
    const promise1 = axios.get(`${URL}/games?key=${API_KEY}`);
    const promise2 = axios.get(`${URL}/games?key=${API_KEY}&page=2`);
    const promise3 = axios.get(`${URL}/games?key=${API_KEY}&page=3`);
    const promise4 = axios.get(`${URL}/games?key=${API_KEY}&page=4`);
    const promise5 = axios.get(`${URL}/games?key=${API_KEY}&page=5`);
    let Apiresult = {};
    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
      Apiresult = values[0].data.results.
        concat(values[1].data.results).
        concat(values[2].data.results).
        concat(values[3].data.results).
        concat(values[4].data.results);
    }, {
      function(err) {

        console.log(err);
      }
    });
   
    if (Apiresult) {
     
      const videogames = Apiresult.map((ch) => {
        if(ch.name.toUpperCase().includes(name)){
          console.log("getGamesByName-name.ch.genres[dato].name");
          console.log(ch.name);
          let generos = "";
          if (ch.genres) {
            let contador = 0;
            for (let dato in ch.genres) {
              if (contador == 0)
                generos += ch.genres[dato].name;
              else
                generos += "," + ch.genres[dato].name;
              contador += 1;
            }
          }

          const videogame = {
            id: ch.id,
            name: ch.name,
            descripcion: ch.descripcion,
            platforms: ch.platforms,
            image: ch.background_image,
            released: ch.released,
            rating: ch.rating,
            genres: generos,
          };
          return videogame;
        }
      });

      res.status(STATUS_OK).json(videogames.filter(el => el != null));
    } else {
      res.status(STATUS_ERROR).json({ message: "videogames not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getAllVideogames(req, res) {
  try {
    let videogameBDFin=[];
      try {
        
        let videogameBD = await Videogame.findAll({
          
        });
        console.log("videogameBD");
        console.log(videogameBD);
        let GenerosxVideojuegoBD = await Videogame_Genres.findAll({
          
        });
        console.log("GenerosxVideojuegoBD");
        console.log(GenerosxVideojuegoBD);
        videogameBD.forEach((vg) => {
           let vieogame_bd = {           
            id: vg.id,
            name: vg.name,
            descripcion: vg.descripcion,
            platforms: vg.platforms,
            image: vg.background_image,
            released: vg.released,
            rating: vg.rating,
            genres:'' ,
            createdInDb:vg.createdInDb
          };
          videogameBDFin.push(vieogame_bd);
          console.log("videogameBDFin");
          console.log(videogameBDFin);
        });
      } catch (error) {
        console.error(error);
        throw error;
      }     

    const promise1 = axios.get(`${URL}/games?key=${API_KEY}`);
    const promise2 = axios.get(`${URL}/games?key=${API_KEY}&page=2`);
    const promise3 = axios.get(`${URL}/games?key=${API_KEY}&page=3`);
    const promise4 = axios.get(`${URL}/games?key=${API_KEY}&page=4`);
    const promise5 = axios.get(`${URL}/games?key=${API_KEY}&page=5`);
    let Apiresult = {};
    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
      Apiresult = values[0].data.results.
        concat(values[1].data.results).
        concat(values[2].data.results).
        concat(values[3].data.results).
        concat(values[4].data.results);
    }, {
      function(err) {

        console.log(err);
      }
    });
    if (Apiresult) {
      let videogames = Apiresult.map((ch) => {      
          const videogame = {
          id: ch.id,
          name: ch.name,
          descripcion: ch.descripcion,
          platforms: ch.platforms,
          image: ch.background_image,
          released: ch.released,
          rating: ch.rating,
          genres: ch.genres ? generos=ch.genres.map(vg => vg.name).join(" , "): '',
          createdInDb:false
        };
        return videogame;
      });
      let videoGameFinal=videogames.concat(videogameBDFin)  ;
      res.status(STATUS_OK).json(videoGameFinal.filter(el => el != null));
    } else {
      res.status(STATUS_ERROR).json({ message: "videogames not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getGamesByGenero(req, res) {
  try {
    console.log("getGamesByGenero-entró");
    console.log(req.params);
    let { filtrogenres } = req.params;
    filtrogenres=filtrogenres.toUpperCase();   
    console.log(filtrogenres);
    const promise1 = axios.get(`${URL}/games?key=${API_KEY}`);
    const promise2 = axios.get(`${URL}/games?key=${API_KEY}&page=2`);
    const promise3 = axios.get(`${URL}/games?key=${API_KEY}&page=3`);
    const promise4 = axios.get(`${URL}/games?key=${API_KEY}&page=4`);
    const promise5 = axios.get(`${URL}/games?key=${API_KEY}&page=5`);
    let Apiresult = {};
    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (values) {
      Apiresult = values[0].data.results.
        concat(values[1].data.results).
        concat(values[2].data.results).
        concat(values[3].data.results).
        concat(values[4].data.results);
    }, {
      function(err) {

        console.log(err);
      }
    });
    console.log("getGamesByGenero-Apiresult");
    console.log(Apiresult);
    if (Apiresult) {
     
      const videogames = Apiresult.map((ch) => {
        if(ch.genres){
          
          if(ch.genres.map((gen)=> gen.name.toUpperCase()).includes(filtrogenres)){
            const videogame = {
              id: ch.id,
              name: ch.name,
              descripcion: ch.descripcion,
              platforms: ch.platforms,
              image: ch.background_image,
              released: ch.released,
              rating: ch.rating,
              genres: ch.genres ? ch.genres.map(vg => vg.name).join(" , "): '',
            };
            return videogame;
          }
      }
      });

      res.status(STATUS_OK).json(videogames.filter(el => el != null));
    } else {
      res.status(STATUS_ERROR).json({ message: "videogames not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = {
  getGamesById,
  getGamesByName,
  getAllVideogames,
  getGamesByGenero
};
