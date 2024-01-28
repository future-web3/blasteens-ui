import { Outlet, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import React from "react";


function Navbar() {
  return (
    <div>
      <nav className={styles.navBarContainer}>
        
        <div className={styles.navBarWrapper}>
          <div className={styles.logo}>Logo</div>
          <div className={styles.linksContainer}>
            <Link to="/Homepage">Home</Link>
            <Link to="/market-place">Market Place</Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
