import { GET_ALLVIDEOGAMES,CREATE_VIDEOGAMES} from "./actions";

const initialState = {
    allVideogames: []
}

const rootReducer = (state = initialState,action) =>{
    switch (action.type) {
        case GET_ALLVIDEOGAMES: return {
            ...state,
            allVideogames: action.payload,
            filterVideogames: action.payload
        }
        case CREATE_VIDEOGAMES:
            state.allVideogames.push(action.payload);
            return{
                ...state,
                allVideogames:[...state.allVideogames]
            }

        case FILTER_BY_GENRES:
            const videoGamesG = state.allVideogames
            let videogamelimpio=[];
            console.log("FILTER_BY_GENRES");

            let gameGenre = action.payload === 'All'
            ? state.allVideogames                          //debemos aplicar map, porque genres es un array de string
            : videoGamesG.filter((game) => {
               return !game.genres
                ? game.genres.includes(action.payload):videogamelimpio
            })
            //si selecciono otro entonces mostrar todos los Video Juegos
            if (gameGenre.length === 0) {
                gameGenre = videogamelimpio;
                alert('No videogames found with the selected genre.')
            }
            
            return{
                ...state,
                allVideogames: gameGenre
            }
        default: return {...state}
    }
}

export default rootReducer;