import React from 'react';
import styles from './NavBar.modules.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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

