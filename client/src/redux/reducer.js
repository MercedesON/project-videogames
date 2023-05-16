import { GET_GENRES,GET_ALLVIDEOGAMES,CREATE_VIDEOGAMES,ORDER_GAMES,GET_PLATFORMS,FILTER_GENRES} from "./actions";

const initialState = {
    allVideogames: [],
    genresGames: [],
    platformsGames:[],
    orderGames:[]
}

const rootReducer = (state = initialState,action) =>{
    console.log("action.type");
    console.log(action.type);
    switch (action.type) {
        case GET_ALLVIDEOGAMES: return {
            ...state,
            allVideogames: action.payload ,           
            orderGames: action.payload
        }
        case CREATE_VIDEOGAMES:
            state.allVideogames.push(action.payload);
            return{
                ...state,
                allVideogames:[...state.allVideogames]
            }
        case GET_GENRES: return {
            ...state,
             //genresGames: action.payload
             genresGames:[...action.payload].sort((a, b) => a.name.localeCompare(b.name))
        }
        case GET_PLATFORMS: return {
            ...state,
             //genresGames: action.payload
             platformsGames:[...action.payload].sort((a, b) => a.name.localeCompare(b.name))
        }
        case ORDER_GAMES:            
            const Games = [...state.allVideogames];      
            const SortGames = (action.payload === 'asc'? Games.sort((a, b) => a.name.localeCompare(b.name))
            : (action.payload === 'desc')? Games.sort((a, b) => b.name.localeCompare(a.name))
            : (action.payload === 'ratingAsc')? Games.sort((a, b) => a.rating-b.rating)
            :(action.payload === 'ratingDesc')? Games.sort((g1,g2) => {    
                   if (g1.rating < g2.rating) return 1;
                   if (g1.rating > g2.rating) return -1;  
                   return 0;
               }): Games)            
        return{
            ...state,
            orderGames: SortGames
        }
        // case FILTER_GENRES: 
       
        //     const Videogame = [...state.filterGames];   
        //     console.log("Videogame");
        //     console.log(Videogame);   
        //     const Filter = (action.payload === 'All'? Videogame 
        //     : (action.payload !== 'All')? Videogame :Videogame )
        // return{
        //     ...state,
        //     filterGames: Filter 
        // }
        default: return {...state}
    }
}

export default rootReducer;