const axios = require("axios");
require("dotenv").config();

const URL = process.env.URL;
const API_KEY = process.env.API_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const STATUS_OK = 200;
const STATUS_ERROR = 404;

async function getAllPlatforms(req, res) {
  try {
     console.log("entro a plataformas");
        const response = await axios.get(`${URL}/platforms?key=${API_KEY}`);             
        // Hacemos un map y solo traemos el nombre de cada género
        const allPlatforms = response?.data?.results?.map((platfrom)=>{
              return{
                id:platfrom.id,
                name:platfrom.name
              }
        });

        res.status(STATUS_OK).json(allPlatforms);
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}


module.exports = {
  getAllPlatforms
};
