import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";//hooks
import { getAllGames,getGameByName,getAllGenres,filterGenres} from '../../redux/actions.js';
import style from './Cards.module.css';
//import Card from '../Card/Card';
//import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const PaginationCards = ({ cardsPerPage,filterOption }) => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortRatingOrder, setRatingOrder] = useState('ratingAsc');
  const [name, setName] = useState("");
  const [allGenres, setDataGeneres] = useState([]);

  useEffect(() => {
    if (filterOption === '' && name === ''){
      getAllGames().then((response) => {
        setData(response.data);  
      });      
    }
    getAllGenres().then((response) => {
      setDataGeneres(response.data);  
    }); 
    // getAllPlatforms().then((response) => {
    //   setDataPlatforms(response.data);  
    // });

  }, [name,filterOption]);
  //console.log("getAllGames");
  //console.log(data);
  //console.log("data.length ");
  //console.log(data.length );
  const itemsPerPage = cardsPerPage;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleSortAsc = () => {
    setSortOrder('asc');
    setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleRatingAsc = () => {
    setRatingOrder('ratingAsc');
    setData([...data].sort((a, b) => a.rating-b.rating));
  };
  
  const handleSortDesc = () => {
    setSortOrder('desc');
    setData([...data].sort((a, b) => b.name.localeCompare(a.name)));
  };
  const handleRatingDesc = () => {
    setRatingOrder('ratingDesc');
    setData([...data].sort((a, b) => b.rating-a.rating));
  };

  const SearchGameByName = () => {    
    console.log("name");
    console.log(name);
    if(name!=""){
      getGameByName(name).then((resp) => {
        console.log("SearchGameByName-response-data");
        console.log(resp.data);
        if(resp.data){
          if(resp.data.length>0)
              setData(resp.data);           
          else
              window.alert("No hay videojuegos con ese nombre");
        }
        else{
          window.alert("No hay videojuegos con ese nombre");
        }
      });
      //console.log("SearchGameByName-data");
      //console.log(data);
    }else{
      getAllGames().then((response) => {
        setData(response.data);        
      });
    }


    /*try {
      //const { data } = getGameById(id);
      // await axios(
      //   `http://localhost:3001/videogames/${id}`
      // );
      getGameById(id).then((response) => {
        setCharacter(response.data);        
      });
      if (character) {
        //Hay data
      } else {
        window.alert("No hay videojuegos con ese ID");
      }
    } catch (error) {
      console.log("videojuegos update in useeffect in component Detail", error);
    }*/
  };


  const handleFilterGenres =(event)=>{
    event.preventDefault();
    let valorSeleccionado=event.target.value;
    console.log("valorSeleccionado");
    console.log(valorSeleccionado);
   
    if(valorSeleccionado!="All"){
      filterGenres(valorSeleccionado).then((resp) => {
        console.log("SearchGameByName-response-data");
        console.log(resp.data);
        if(resp.data){
          if(resp.data.length>0)
              setData(resp.data);           
          else
              window.alert("No hay videojuegos con el genero seleccionado");
        }
        else{
          window.alert("No hay videojuegos con el genero seleccionado");
        }
      });
      //console.log("SearchGameByName-data");
      //console.log(data);
    }else{
      getAllGames().then((response) => {
        setData(response.data);        
      });
    }
}
// const handleFilterPlatfom =(event)=>{
//   event.preventDefault();
//   //dispatch(filterGenres(event.target.value))
// }
const handleFilterPlatforms =(event)=>{
  event.preventDefault();
  //dispatch(filterGenres(event.target.value))
}
  const handleChange = (event) => {
      setName(event.target.value);        //Guardo el valor del input en un estado local.
  }
  const renderCards = () => {
    //const startIndex = (currentPage - 1) * itemsPerPage;
    //const endIndex = startIndex + itemsPerPage;
    if (Array.isArray(data)) {  
      console.log("Array.isArray-data");
      //console.log(data);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      //const pageData = data.slice(startIndex, endIndex);
      const sortedData = [...data];
      if (sortOrder === 'asc') {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (sortRatingOrder === 'ratingAsc') {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
      return data.slice(startIndex, endIndex).map((card) => {
        return (
          <div className={style.cardsContainer} key={card.id}>           
            {/* <Link className={style.link} to=to="/favorites"{`/detail/${card.id}`}> */}
            {/* <Link className={style.link} to={`/detail/${card.id}`}>
            <h2 className={style.cardName}>{card.name}</h2>
            </Link>  */}
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
      // return (
      //   (
      //     <div>
      //       <div className={style.cardsContainer}>
      //         {data &&
      //           data.map((card) => {
      //             return (
      //               <Card
      //                 key={card.id}
      //                 id={card.id}
      //                 name={card.name}
      //                 // status={card.status}
      //                 // species={card.species}
      //                 // gender={card.gender}
      //                 // origin={card.origin}
      //                 image={card.image}
      //                 genres={card.genres}
      //                 //onClose={onClose}
      //               ></Card>
      //             );
      //           })}
      //       </div>
      //       {/* <Paginate cantPages={totalPages}></Paginate> */}
      //     </div>
      //   )
      // );
    
    } else {
      // Handle the case where data is not an array
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            href="#"
            onClick={(e) => handleClick(e, i)}
            className={i === currentPage ? "active" : ""}
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
        <select className={style.SelecGenero} onChange={handleFilterGenres}>
                    {/* //filtrado por genres
                <option>Filtrar por Genero</option> */}
                <option value="All" >Todos</option>
                    {
                        allGenres?.map((genre)=>(
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))
                    }
        </select>
       
      </div>
      <div className={style.cardsPerPage}>{renderCards()}</div>
      <ul className={style.paginationCards}>{renderPagination()}</ul>         
    </div>
  );
};

export default PaginationCards;
