import { GET_GENRES,GET_ALLVIDEOGAMES,CREATE_VIDEOGAMES,ORDER_GAMES,GET_PLATFORMS,FILTER_GENRES, FILTER_ORIGIN,FILTER_NAME} from "./actions";

const initialState = {
    allVideogames: [],
    genresGames: [],
    platformsGames:[],
    orderGames:[],
    filterGames:[]
}

const rootReducer = (state = initialState,action) =>{
    //console.log("action.type");
    //console.log(action.type);
    switch (action.type) {
        case GET_ALLVIDEOGAMES: return {
            ...state,
            allVideogames: action.payload ,           
            orderGames: action.payload,//aca lleno 
            filterGames: action.payload
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
        case FILTER_GENRES: 
            console.log("FILTER_GENRES-action.payload");
            console.log(action.payload);
            const Videogame = [...state.filterGames];   
            const Filter = (action.payload === 'All')? Videogame 
            : Videogame.filter((game)=>{
                return  game.genres.toUpperCase().includes(action.payload.toUpperCase()) ;
            })
            
        return{
            ...state,
            //filterGames: Filter 
            orderGames: Filter
        }
        case FILTER_ORIGIN: 
            console.log("FILTER_ORIGIN-action.payload");
            console.log(action.payload);
            const VideogameOri = [...state.filterGames];   
            console.log("FILTER_ORIGIN-VideogameOri");
            console.log(VideogameOri);
            const FilterOri = (action.payload === 'All'? VideogameOri 
            :(action.payload === '0')? VideogameOri.filter((game)=>{
                return  game.createdInDb===false })
            :(action.payload === '1')? VideogameOri.filter((game)=>{
                return  game.createdInDb===true  }):VideogameOri)

            //const resultBD = dataLocal.filter((game) => game.createdInDb === true)
            
        return{
            ...state,
            //filterGames: Filter 
            orderGames: FilterOri
        }
        case FILTER_NAME:
            console.log("FILTER_NAME-action.payload");
            console.log(action.payload);
            const FilName = [...state.filterGames];   
            const FilGame = (action.payload === ''? FilName 
            : FilName.filter((game)=>{
                return  game.name.toUpperCase().includes(action.payload.toUpperCase()) ;
            }))
            
        return{
            ...state,
            //filterGames: Filter 
            orderGames: FilGame
        }
        default: return {...state}
    }
}

export default rootReducer;