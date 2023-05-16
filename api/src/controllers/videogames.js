const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const { Videogame,Genres, Videogame_Genres } = require("../db.js");

const URL = process.env.URL;
const API_KEY = process.env.API_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const STATUS_OK = 200;
const STATUS_ERROR = 404;


async function createVideogame(req, res) {
  let idVideogame = 3636;
  console.log("Ingreso Create");
  console.log(req.body);
  const { name, image, description, released, rating, platforms, genres } = req.body;
  //console.log("req.body.name");
  //console.log(req.body);

  const existVideogame = await Videogame.findAll({    //Verifico si el juego ya existe en la base de datos.
    where: {
      name: {
        [Op.iLike]: `%${name}%`,    //Condiciono que el name del nuevo juego sea igual a alguno de la DB o lo contenga. 
      }
    }
  })
  //Si ya hay un juego con ese nombre en la DB, error.
  if (existVideogame.length > 0) {
    console.log("existVideogame");
    //throw new Error("There is already a game with that name."); 
    return res.status(STATUS_OK).json({ message: "Ya se ha creado un videojuego con este nombre " + name });

  } else {
    const VideogameBD = await Videogame.findAll({
    })
    console.log("VideogameBD");
    console.log(VideogameBD);
    if (VideogameBD.length > 0) {
      console.log("VideogameBD-max");     
      let max = 0;
      if(VideogameBD.length>0){
        VideogameBD.forEach((vg) => {   
          if (max <  vg.id)
          max =  vg.id;          
        });            
      }    
      idVideogame =max+1;
    }
    else {
      idVideogame += 1;
      console.log("VideogameBD-idVideogame");
      console.log(idVideogame);
    }
    //Creo un nuego juego en la DB.
    //name, description, released, rating, platforms, background_image, "createdInDb"
    //const newVideogame = await Videogame.create({id,name,description,released,rating,platforms,image}); 

    // el bulkCreate => permite pasarle un array de objetos y los crea todos juntos en la Base de Datos
    let newVideoGame = [];
    let vieogame_bd = {
      id: idVideogame,
      name: name,
      description: description,
      platforms: platforms,
      background_image: image,
      released: released,
      rating: rating,
      createdInDb: true
    };
    newVideoGame.push(vieogame_bd);
    console.log("va a crear videogame");
    console.log(vieogame_bd);
    await Videogame.bulkCreate(newVideoGame);
    console.log("creo videogame");
    
    console.log("va a crear Videogame_Genres");
    let newVideogame_Genres=[];
    console.log("createVideogame.genres");
    console.log(genres);
    if(genres.length>0){
      genres.forEach((vg) => {   
        let Videogame_Genres_bd = {          
          GenreId: vg,
          VideogameId: idVideogame};
          newVideogame_Genres.push(Videogame_Genres_bd);   
      });            
    } 
    console.log("create-newVideogame_Genres");
    console.log(newVideogame_Genres);
    await Videogame_Genres.bulkCreate(newVideogame_Genres);
    console.log("creo Videogame_Genres");
    return res.status(STATUS_OK).json({ message: "Se registró satisfactoriamente el videojuego " + name });
  }
}



async function getGamesById(req, res) {
  try {
    const { idVideogame } = req.params;
    console.log("getGamesById-idVideogame");


    let videogameBDFin = [];
    let GenerosxVideojuegoBDFin=[];
    try {

      let videogameBD = await Videogame.findAll({
      
      });
    
      let GenerosxVideojuegoBD = await Videogame_Genres.findAll({

      });      
      
      GenerosxVideojuegoBD.forEach((vg) => {
        let vid_gen_bd = {
          GenreId: vg.GenreId,
          VideogameId: vg.VideogameId
        };
        GenerosxVideojuegoBDFin.push(vid_gen_bd);        
      });
      const listaGeneroBD = await Genres.findAll({     
      });
      let listaGeneroBDArray=[];
      listaGeneroBD.forEach((vg) => {
        let vid_gen_bd = {
          id: vg.id,
          name: vg.name
        };
        listaGeneroBDArray.push(vid_gen_bd);        
      });  
      // console.log("GenerosxVideojuegoBDFin");
      // console.log(GenerosxVideojuegoBDFin);

      let vidgenunique=[];    
      GenerosxVideojuegoBDFin.filter(function(item){
        // console.log("item");
        // console.log(item);
        var i = vidgenunique.findIndex(x => (x.VideogameId == item.VideogameId));
        if(i <= -1){
          vidgenunique.push(item.VideogameId);
        }
        return null;
      });
      //console.log("vidgenunique");
      //console.log(vidgenunique);

     let merce=[];

      vidgenunique.forEach((vg) => {
        //console.log("vg");
        //console.log(vg);
        var vv=GenerosxVideojuegoBDFin.filter(el => el.VideogameId ==vg);
         let genresmerce = {
          id: vg,
          listgenres: vv?vv.map(vg => vg.GenreId).join(" , "):''          
          //listgenres: vv     
        }
        merce.push(genresmerce);
      });
      //console.log("merce");
      //console.log(merce);

      let mercerunique=[];
      merce.filter(function(item){
        //console.log("item");
        //console.log(item);
        var i = mercerunique.findIndex(x => (x.id == item.id && x.listgenres == item.listgenres));
        //console.log("i");
        //console.log(i);
        if(i <= -1){
          mercerunique.push(item);
        }
        return null;
      });
      //console.log("mercerunique");
      //console.log(mercerunique);
      let mercefin=[];
      let desgen="";
      mercerunique.forEach((vg) => {
        //console.log("mercerunique-vg");
        //console.log(vg.id);
        desgen=recuperaGenero(vg.listgenres,listaGeneroBDArray);
        let genresmerce = {
          id: vg.id,
          generos: desgen        
        }
        mercefin.push(genresmerce);
      });
      console.log("mercefin");
      console.log(mercefin);
      let ultdes="";
      videogameBD.forEach((vg) => {
        if(vg.id==idVideogame){
          let desNomGen=mercefin.filter(el => el.id ==vg.id);   
          if(desNomGen){
            for (var key in desNomGen) {
              if (desNomGen.hasOwnProperty(key)) {          
                //console.log(desNomGen[key].generos);
                ultdes=desNomGen[key].generos;
              }
            }         
          }
          console.log("ultdes");
          console.log(ultdes);
          
          let vieogame_bd = {
            id: vg.id,
            name: vg.name,
            descripcion: vg.descripcion,
            platform: vg.platforms,
            background_image: vg.background_image,
            released: vg.released,
            rating: vg.rating,
            generos:ultdes,
            createdInDb: vg.createdInDb,
          };
          videogameBDFin.push(vieogame_bd);
          //console.log("videogameBDFin");
          console.log(videogameBDFin);
          return res.status(STATUS_OK).json(vieogame_bd);
        }
      });

      
      console.log("videogameBDFin");
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
    name = name.toUpperCase();

    let videogameBDFin = [];
    let GenerosxVideojuegoBDFin=[];
    try {

      let videogameBD = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, 
          }
        }
      });
    
      let GenerosxVideojuegoBD = await Videogame_Genres.findAll({

      });      
      
      GenerosxVideojuegoBD.forEach((vg) => {
        let vid_gen_bd = {
          GenreId: vg.GenreId,
          VideogameId: vg.VideogameId
        };
        GenerosxVideojuegoBDFin.push(vid_gen_bd);        
      });
      const listaGeneroBD = await Genres.findAll({     
      });
      let listaGeneroBDArray=[];
      listaGeneroBD.forEach((vg) => {
        let vid_gen_bd = {
          id: vg.id,
          name: vg.name
        };
        listaGeneroBDArray.push(vid_gen_bd);        
      });  
      // console.log("GenerosxVideojuegoBDFin");
      // console.log(GenerosxVideojuegoBDFin);

      let vidgenunique=[];    
      GenerosxVideojuegoBDFin.filter(function(item){
        // console.log("item");
        // console.log(item);
        var i = vidgenunique.findIndex(x => (x.VideogameId == item.VideogameId));
        if(i <= -1){
          vidgenunique.push(item.VideogameId);
        }
        return null;
      });
      //console.log("vidgenunique");
      //console.log(vidgenunique);

     let merce=[];

      vidgenunique.forEach((vg) => {
        //console.log("vg");
        //console.log(vg);
        var vv=GenerosxVideojuegoBDFin.filter(el => el.VideogameId ==vg);
         let genresmerce = {
          id: vg,
          listgenres: vv?vv.map(vg => vg.GenreId).join(" , "):''          
          //listgenres: vv     
        }
        merce.push(genresmerce);
      });
      //console.log("merce");
      //console.log(merce);

      let mercerunique=[];
      merce.filter(function(item){
        //console.log("item");
        //console.log(item);
        var i = mercerunique.findIndex(x => (x.id == item.id && x.listgenres == item.listgenres));
        //console.log("i");
        //console.log(i);
        if(i <= -1){
          mercerunique.push(item);
        }
        return null;
      });
      //console.log("mercerunique");
      //console.log(mercerunique);
      let mercefin=[];
      let desgen="";
      mercerunique.forEach((vg) => {
        //console.log("mercerunique-vg");
        //console.log(vg.id);
        desgen=recuperaGenero(vg.listgenres,listaGeneroBDArray);
        let genresmerce = {
          id: vg.id,
          generos: desgen        
        }
        mercefin.push(genresmerce);
      });
      console.log("mercefin");
      console.log(mercefin);
      let ultdes="";
      videogameBD.forEach((vg) => {
        let desNomGen=mercefin.filter(el => el.id ==vg.id);   
        if(desNomGen){
          for (var key in desNomGen) {
            if (desNomGen.hasOwnProperty(key)) {          
              //console.log(desNomGen[key].generos);
              ultdes=desNomGen[key].generos;
            }
          }         
        }
        console.log("ultdes");
        console.log(ultdes);
        
        let vieogame_bd = {
          id: vg.id,
          name: vg.name,
          descripcion: vg.descripcion,
          platforms: vg.platforms,
          image: vg.background_image,
          released: vg.released,
          rating: vg.rating,
          genres:ultdes,
          createdInDb: vg.createdInDb,
        };
        videogameBDFin.push(vieogame_bd);
        //console.log("videogameBDFin");
        console.log(videogameBDFin);
      });

      
      console.log("videogameBDFin");
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

      const videogames = Apiresult.map((ch) => {
        if (ch.name.toUpperCase().includes(name)) {
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

      //res.status(STATUS_OK).json(videogames.filter(el => el != null));

      let videoGameFinal = videogames.concat(videogameBDFin);
      res.status(STATUS_OK).json(videoGameFinal.filter(el => el != null));
    } else {
      res.status(STATUS_ERROR).json({ message: "videogames not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

 function recuperaGenero(listID,listaGeneroBDArray){
  let desGenero=""; 
  let listidff= listID.replace("'", '');
  listidff= listidff.replace(' ', '');
  let ddssd=listidff.split(',');

  let desgenn=[];
 let nomGen="";

  for(obj in ddssd){  
    var nomGenFilter=listaGeneroBDArray.filter(el => el.id ==ddssd[obj]);   
    if(nomGenFilter){
      for (var key in nomGenFilter) {
        if (nomGenFilter.hasOwnProperty(key)) {          
          console.log(nomGenFilter[key].name);
          nomGen=nomGenFilter[key].name;
        }
      }
      desgenn.push(nomGen);
    }
  }
  
  desgenn ? desGenero = desgenn.map(vg => vg).join(" , ") : '';
  //console.log("desGenero");
  console.log(desGenero);
  return desGenero;
}

async function getAllVideogames(req, res) {
  try {
    let videogameBDFin = [];
    let GenerosxVideojuegoBDFin=[];
    try {

      let videogameBD = await Videogame.findAll({

      });
      // console.log("videogameBD");
      // console.log(videogameBD);
      let GenerosxVideojuegoBD = await Videogame_Genres.findAll({

      });      
      
      GenerosxVideojuegoBD.forEach((vg) => {
        let vid_gen_bd = {
          GenreId: vg.GenreId,
          VideogameId: vg.VideogameId
        };
        GenerosxVideojuegoBDFin.push(vid_gen_bd);        
      });
      const listaGeneroBD = await Genres.findAll({     
      });
      let listaGeneroBDArray=[];
      listaGeneroBD.forEach((vg) => {
        let vid_gen_bd = {
          id: vg.id,
          name: vg.name
        };
        listaGeneroBDArray.push(vid_gen_bd);        
      });  
      // console.log("GenerosxVideojuegoBDFin");
      // console.log(GenerosxVideojuegoBDFin);

      let vidgenunique=[];    
      GenerosxVideojuegoBDFin.filter(function(item){
        // console.log("item");
        // console.log(item);
        var i = vidgenunique.findIndex(x => (x.VideogameId == item.VideogameId));
        if(i <= -1){
          vidgenunique.push(item.VideogameId);
        }
        return null;
      });
      //console.log("vidgenunique");
      //console.log(vidgenunique);

     let merce=[];

      vidgenunique.forEach((vg) => {
        //console.log("vg");
        //console.log(vg);
        var vv=GenerosxVideojuegoBDFin.filter(el => el.VideogameId ==vg);
         let genresmerce = {
          id: vg,
          listgenres: vv?vv.map(vg => vg.GenreId).join(" , "):''          
          //listgenres: vv     
        }
        merce.push(genresmerce);
      });
      //console.log("merce");
      //console.log(merce);

      let mercerunique=[];
      merce.filter(function(item){
        //console.log("item");
        //console.log(item);
        var i = mercerunique.findIndex(x => (x.id == item.id && x.listgenres == item.listgenres));
        //console.log("i");
        //console.log(i);
        if(i <= -1){
          mercerunique.push(item);
        }
        return null;
      });
      //console.log("mercerunique");
      //console.log(mercerunique);
      let mercefin=[];
      let desgen="";
      mercerunique.forEach((vg) => {
        //console.log("mercerunique-vg");
        //console.log(vg.id);
        desgen=recuperaGenero(vg.listgenres,listaGeneroBDArray);
        let genresmerce = {
          id: vg.id,
          generos: desgen        
        }
        mercefin.push(genresmerce);
      });
      console.log("mercefin");
      console.log(mercefin);
      let ultdes="";
      videogameBD.forEach((vg) => {
        let desNomGen=mercefin.filter(el => el.id ==vg.id);   
        if(desNomGen){
          for (var key in desNomGen) {
            if (desNomGen.hasOwnProperty(key)) {          
              //console.log(desNomGen[key].generos);
              ultdes=desNomGen[key].generos;
            }
          }         
        }
        console.log("ultdes");
        console.log(ultdes);
        
        let vieogame_bd = {
          id: vg.id,
          name: vg.name,
          descripcion: vg.descripcion,
          platforms: vg.platforms,
          image: vg.background_image,
          released: vg.released,
          rating: vg.rating,
          genres:ultdes,
          createdInDb: vg.createdInDb,
        };
        videogameBDFin.push(vieogame_bd);
        //console.log("videogameBDFin");
        console.log(videogameBDFin);
      });

      
      console.log("videogameBDFin");
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
          genres: ch.genres ? generos = ch.genres.map(vg => vg.name).join(" , ") : '',
          createdInDb: false
        };
        return videogame;
      });
      let videoGameFinal = videogames.concat(videogameBDFin);
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
    filtrogenres = filtrogenres.toUpperCase();


    let videogameBDFin = [];
    let GenerosxVideojuegoBDFin=[];
    try {

      let videogameBD = await Videogame.findAll({
      
      });
    
      let GenerosxVideojuegoBD = await Videogame_Genres.findAll({

      });      
      
      GenerosxVideojuegoBD.forEach((vg) => {
        let vid_gen_bd = {
          GenreId: vg.GenreId,
          VideogameId: vg.VideogameId
        };
        GenerosxVideojuegoBDFin.push(vid_gen_bd);        
      });
      const listaGeneroBD = await Genres.findAll({     
      });
      let listaGeneroBDArray=[];
      listaGeneroBD.forEach((vg) => {
        let vid_gen_bd = {
          id: vg.id,
          name: vg.name
        };
        listaGeneroBDArray.push(vid_gen_bd);        
      });  
      // console.log("GenerosxVideojuegoBDFin");
      // console.log(GenerosxVideojuegoBDFin);

      let vidgenunique=[];    
      GenerosxVideojuegoBDFin.filter(function(item){
        // console.log("item");
        // console.log(item);
        var i = vidgenunique.findIndex(x => (x.VideogameId == item.VideogameId));
        if(i <= -1){
          vidgenunique.push(item.VideogameId);
        }
        return null;
      });
      //console.log("vidgenunique");
      //console.log(vidgenunique);

     let merce=[];

      vidgenunique.forEach((vg) => {
        //console.log("vg");
        //console.log(vg);
        var vv=GenerosxVideojuegoBDFin.filter(el => el.VideogameId ==vg);
         let genresmerce = {
          id: vg,
          listgenres: vv?vv.map(vg => vg.GenreId).join(" , "):''          
          //listgenres: vv     
        }
        merce.push(genresmerce);
      });
      //console.log("merce");
      //console.log(merce);

      let mercerunique=[];
      merce.filter(function(item){
        //console.log("item");
        //console.log(item);
        var i = mercerunique.findIndex(x => (x.id == item.id && x.listgenres == item.listgenres));
        //console.log("i");
        //console.log(i);
        if(i <= -1){
          mercerunique.push(item);
        }
        return null;
      });
      //console.log("mercerunique");
      //console.log(mercerunique);
      let mercefin=[];
      let desgen="";
      mercerunique.forEach((vg) => {
        //console.log("mercerunique-vg");
        //console.log(vg.id);
        desgen=recuperaGenero(vg.listgenres,listaGeneroBDArray);
        let genresmerce = {
          id: vg.id,
          generos: desgen        
        }
        mercefin.push(genresmerce);
      });
      console.log("mercefin");
      console.log(mercefin);
      let ultdes="";
      videogameBD.forEach((vg) => {
        
          let desNomGen=mercefin.filter(el => el.id ==vg.id);   
          if(desNomGen){
            for (var key in desNomGen) {
              if (desNomGen.hasOwnProperty(key)) {          
                //console.log(desNomGen[key].generos);
                ultdes=desNomGen[key].generos;
              }
            }                     
          }

          if (ultdes.toUpperCase().includes(filtrogenres)) {
              console.log("ultdes");
              console.log(ultdes);
              
              let vieogame_bd = {
                id: vg.id,
                name: vg.name,
                descripcion: vg.descripcion,
                platforms: vg.platforms,
                image: vg.background_image,
                released: vg.released,
                rating: vg.rating,
                genres:ultdes,
                createdInDb: vg.createdInDb,
              };
              videogameBDFin.push(vieogame_bd);
              //console.log("videogameBDFin");
              console.log(videogameBDFin);
              //return res.status(STATUS_OK).json(vieogame_bd);
          }
      });
      console.log("videogameBDFin");
      console.log(videogameBDFin);
    } catch (error) {
      console.error(error);
      throw error;
    }









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
        if (ch.genres) {
          if (ch.genres.map((gen) => gen.name.toUpperCase()).includes(filtrogenres)) {
            const videogame = {
              id: ch.id,
              name: ch.name,
              descripcion: ch.descripcion,
              platforms: ch.platforms,
              image: ch.background_image,
              released: ch.released,
              rating: ch.rating,
              genres: ch.genres ? ch.genres.map(vg => vg.name).join(" , ") : '',
              createdInDb:false
            };
            return videogame;
          }
        }
      });
      let videoGameFinal = videogames.concat(videogameBDFin);
      res.status(STATUS_OK).json(videoGameFinal.filter(el => el != null));
      //res.status(STATU7S_OK).json(videogames.filter(el => el != null));
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
  getGamesByGenero,
  createVideogame
};
