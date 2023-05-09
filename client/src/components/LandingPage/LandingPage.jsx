import React from 'react'
import styles from './LandingPage.module.css';
import { useHistory } from "react-router-dom";
//import { Link } from 'react-router-dom';
//import Image from '../../../images/fruits-vegetables.jpg';
//import Image from '../../images/fondo.jpg';
//import ImageResp from '../../../images/food-responsive.jpg';


export default function LandingPage() {
  const navigate = useHistory();
  const home = () => navigate.push("/home");
  return (
    // <div>
    //   <Link to="/home">
    //        <button className={styles.landingButton} >            
    //           <span>Welcome to Mercedes's VideoGames</span>
    //         </button>
    //     </Link> 
    //     <img src={Image} alt="videogames" className={styles.landingImage}></img>          
    // </div>
    <div className={styles.contGlobal}>
        <div className={styles.landing}>
          <h2 className={styles.title}>Welcome to Mercedes's VideoGames</h2>
          <button className={styles.enterButton} onClick={() => home()}>Inicio</button>
          {/* <Link to="/home">
            <button className={styles.enterButton} >            
               <span>Welcome to Mercedes's VideoGames</span>
             </button>
         </Link>  */}
        </div>
      </div>
  )
}