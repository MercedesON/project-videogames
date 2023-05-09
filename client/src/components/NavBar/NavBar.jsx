import React, { useState } from 'react';
import styles from './NavBar.modules.css';
//import NameSearch from "./NameSearch/NameSearch";
//import { Link } from 'react-router-dom/cjs/react-router-dom.min';
//import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from '../SearchBar/SearchBar';

//import { useHistory } from "react-router-dom";
//import Logo from './../../images/videogame.png';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <ul  id="Nav_menu">
        <li>
          <Link
            to="/home"
            className="Nav_link_act">
            🏡HOME
          </Link>
        </li>
        <li>
          <Link
          to="/form"
          className="Nav_link">
            🎮Create Videogames
          </Link>
        </li>  
        <li>
          {/* <SearchBar></SearchBar> */}
        {/* <form>
            <input className={styles.searchInput} 
                  name='Name'
                  // value={recipeName}
                  // onChange={handleInputChange}
                  // onKeyPress={(event) => {
                  //   if (event.key === 'Enter') {
                  //     event.preventDefault();
                  //     handleSubmit();
                  //   } else if (event.target.value.trim() === '') {
                  //     event.target.value = '';
                  //   }
                  // }}
                  placeholder='Search Videogame'
                />
              <button className={styles.searchFormButton}  type='submit'>Search</button>
        </form>  */}
        </li>
        
        <li>
          <Link
          to="/"  className="Nav_link">
            Exit
          </Link>
        </li>
        </ul> 
        </div>
        
    );
  }
}

export default Nav;

