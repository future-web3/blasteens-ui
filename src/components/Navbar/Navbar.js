import { Outlet, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import React from "react";
function Layout() {
  return (
    <div>
      <nav className={styles.navBarContainer}>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="/game-glossary">Game Glossary</Link>
        </div>
        <div>
          <Link to="/crypto-dungeon">Crypto Dungeon</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
