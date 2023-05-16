import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";//hooks
import { getAllGames,getGameByName,getGenres,filterGenre,orderxGames} from '../../redux/actions.js';
import style from './Cards.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const PaginationCards = ({ cardsPerPage,filterOption }) => {
  //const dispatch = useDispatch();
  //const todosLosjuegos = useSelector((state)=> state.allVideogames)
  //console.log("todosLosjuegos");
  //console.log(todosLosjuegos);
  
  //const [data, setData] = useState([]);
  //const [dataLocal, setDataLocal] = useState([]);
  // const [sortOrder, setSortOrder] = useState('asc');
  const [dataLocal] = useState([]);
  const [sortOrder] = useState('asc');
  //const [sortRatingOrder, setRatingOrder] = useState('ratingAsc');
  const [sortRatingOrder] = useState('ratingAsc');
  const [name, setName] = useState("");
  //const [allGenres, setDataGeneres] = useState([]);

  let data = useSelector((state)=> state.allVideogames);
  //console.log("data.allVideogames");
  //console.log(data);
  data = useSelector((state) => state.orderGames);
  console.log("data.orderGames");
  console.log(data);
  const allGenres = useSelector((state)=> state.genresGames);

  const dispatch = useDispatch(); 

  useEffect(() => {  
    dispatch(getAllGames());
  },[dispatch])

  useEffect(() => {  
    dispatch(getGenres());
  },[dispatch])

  // useEffect(() => {
  //   console.log("getAllGames-useEffect");
  //   console.log("getAllGames-filterOption");
  //   console.log(filterOption);
  //   console.log("getAllGames-name");       
  //   console.log(name);  
  //   console.log("getAllGames-filterOption");   
  //   console.log(filterOption);
  //   if (filterOption === '' && name === ''){
  //     console.log("getAllGames-entrafiltro");
  //     // getAllGames().then((response) => {
  //     //   console.log("getAllGames-response.data");
  //     //   setData(response.data);  
  //     //   setDataLocal(response.data);

  //     // });
            
  //   }
    
  //   // if(allGenres.length>0){
  //   //   getAllGenres().then((response) => {
  //   //     console.log("getAllGenres-pagiantor");
  //   //     setDataGeneres(response.data);  
  //   //   }); 
  //   // }
  //   getAllGenres().then((response) => {
  //     setDataGeneres(response.data);  
  //   }); 
  // }, [name,filterOption]);

  const itemsPerPage = cardsPerPage;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleSortAsc = () => {
    //setSortOrder('asc');
    //setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
    
    dispatch(orderxGames('asc'));
  };

  const handleRatingAsc = () => {
    //setRatingOrder('ratingAsc');
    //setData([...data].sort((a, b) => a.rating-b.rating));
    dispatch(orderxGames('ratingAsc'));
  };
  
  const handleSortDesc = () => {
    //setSortOrder('desc');
    dispatch(orderxGames('desc'));
    //setData([...data].sort((a, b) => b.name.localeCompare(a.name)));
  };
  const handleRatingDesc = () => {
    dispatch(orderxGames('ratingDesc'));
    //setData([...data].sort((a, b) => b.rating-a.rating));
  };

  const SearchGameByName = () => {    
    console.log("name");
    console.log(name);
    if(name!==""){
      getGameByName(name).then((resp) => {
        console.log("SearchGameByName-response-data");
        console.log(resp.data);
        if(resp.data){
          console.log("SearchGa-data");
          if(resp.data.length>0){  
            console.log("SearchGa-length");          
            //setData(resp.data);   
          }        
          else
              window.alert("No hay videojuegos con ese nombre");
        }
        else{
          window.alert("No hay videojuegos con ese nombre");
        }
      });
    }else{
      getAllGames().then((response) => {
        //setData(response.data); 
        //setDataLocal(response.data);       
      });
    }
  };


  const handleFilterGenres =(event)=>{
    event.preventDefault();
    let valorSeleccionado=event.target.value;
    console.log("valorSeleccionado");
    console.log(valorSeleccionado);
    dispatch(filterGenre(valorSeleccionado));
   
    // if(valorSeleccionado!=="All"){
    //   filterGenres(valorSeleccionado).then((resp) => {
    //     console.log("SearchGameByName-response-data");
    //     console.log(resp.data);
    //     if(resp.data){
    //       if(resp.data.length>0){
    //           //setData(resp.data);
    //       }           
    //       else
    //           window.alert("No hay videojuegos con el genero seleccionado");
    //     }
    //     else{
    //       window.alert("No hay videojuegos con el genero seleccionado");
    //     }
    //   });
    //   //console.log("SearchGameByName-data");
    //   //console.log(data);
    // }else{
    //   getAllGames().then((response) => {
    //     //setData(response.data); 
    //     //setDataLocal(response.data);       
    //   });
    // }
}

const handleFilterOrigen =(event)=>{
  event.preventDefault();
  let origselect=event.target.value;
  console.log("origselect");
  console.log(origselect);
 
  if(origselect!=="All"){
    getAllGames().then((response) => {      
      //setDataLocal(response.data);
    });  
    console.log("dataLocal");
    console.log(dataLocal);
    if(origselect==="1"){
        const resultBD = dataLocal.filter((game) => game.createdInDb === true)
        if(resultBD){
          console.log("dataLocal");
          if(resultBD.length>0){
            console.log("dataLocal.length>");
            //setData(resultBD);  
          }
          else{
            window.alert("No hay videojuegos registrados en la base de Datos VIDEOGAMES");
          }
        }
        else{
          window.alert("No hay videojuegos registrados en la base de Datos VIDEOGAMES");
        }
          
    }else{
      
      //const resultApi = dataLocal.filter((game) => game.createdInDb === false)
        //setData(resultApi);    
    }
  }else{
    getAllGames().then((response) => {
      //setData(response.data);  
      //setDataLocal(response.data);      
    });
  }
}
  const handleChange = (event) => {
      setName(event.target.value);        //Guardo el valor del input en un estado local.
  }
  const renderCards = () => {
    //const startIndex = (currentPage - 1) * itemsPerPage;
    //const endIndex = startIndex + itemsPerPage;
    if (Array.isArray(data)) {  
      //console.log("Array.isArray-data");
      //console.log(data);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      //const pageData = data.slice(startIndex, endIndex);
      const sortedData = [...data];
      console.log("sortData");
      if (sortOrder === 'asc') {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (sortRatingOrder === 'ratingAsc') {
          sortedData.sort((a, b) => a.rating-b.rating);
        } else {
          sortedData.sort((a, b) =>b.rating-a.rating);
        }
      return data.slice(startIndex, endIndex).map((card) => {
        return (
          <div className={style.cardsContainer} key={card.id}>    
            <NavLink
           to={`/detail/${card.id}`}>
          <h2 className={style.cardName}>{card.name}</h2>
          </NavLink>
            <img src={card.image} alt={card.name} className={style.cardImage}/>            
            <p className={style.cardResume}><b>Genero:</b> {card.genres}</p>          
            <p className={style.cardResume}><b>Rating:</b> {card.rating}</p>           
          </div>
        );
      });
    } else {
      // Handle the case where data is not an array
    }
  };

  const renderPagination = () => {
    const pages = [];
    console.log("totalPages");
    console.log(totalPages);
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            href="#"
            onClick={(e) => handleClick(e, i)}
            className={i === currentPage ? style.buttonPagActive : style.buttonDesactivo}
          >
            {i}
          </button>
        </li>
      );
    }
   

    // Agregar flecha hacia la izquierda si no estamos en la primera página
    if (currentPage > 1) {
      pages.unshift(
        <li key="back">
          <button
            href="#"
            onClick={(e) => handleClick(e, currentPage - 1)}
          >
            &lt;
          </button>
        </li>
      );
    }

    // Agregar flecha hacia la derecha si no estamos en la última página
    if (currentPage < totalPages) {
      pages.push(
        <li key="next">
          <button
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      );
    }

    return pages;
};

  return (
    <div>
      <div className={style.ContainerSearch}>
      <input className={style.searchInput}  onChange={handleChange} type="search" name="search" value={name}  />
          <button className={style.searchButton}  onClick={SearchGameByName}>Search 🔎</button>
        {/* <form className={style.ContainerForm}>
          
        </form>       */}
      </div>
      <br />
      <br />
       <div className={style.sortButtonsContainer}> 
        <button className={style.sortAscButton} onClick={handleSortAsc}>A - Z</button>
        <button className={style.sortDescButton} onClick={handleSortDesc}>Z - A</button>
        <button className={style.sortAscButton} onClick={handleRatingAsc}>Rating ⬆️ </button>
        <button className={style.sortDescButton} onClick={handleRatingDesc}>Rating ⬇️ </button>
        <label htmlFor="filtroGenero" className={style.filtroGenero}><b>Filtro por Géneros</b></label>
        <select className={style.SelecGenero} onChange={handleFilterGenres}>                  
                <option value="All" >Todos</option>
                    {
                        allGenres?.map((genre)=>(
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))
                    }
        </select>
        <label htmlFor="filtroOrigen" className={style.filtroOrigen}><b>Filtro por Origen</b></label>
        <select className={style.SelecOrigen} onChange={handleFilterOrigen}>                   
          <option value="All" >Todos</option>
          <option key="0" value="0">Api</option>
          <option key="1" value="1">BD</option>                    
        </select>       
      </div>
      <div className={style.cardsPerPage}>{renderCards()}</div>
      <ul className={style.paginationCards}>{renderPagination()}</ul>         
    </div>
  );
};

export default PaginationCards;
