import { Outlet, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import React from "react";

function Navbar() {
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
          <Link to="/game-glossary/escape-from-germs">Germs</Link>
        </div>
        <div>
          <Link to="/game-glossary/tommy-jumping">Tom</Link>
        </div>
        <div>
          <Link to="/game-glossary/snowman-defender">Snowman</Link>
        </div>
        <div>
          <Link to="/game-glossary/emoji-match">Emoji</Link>
        </div>
        <div>
          <Link to="/crypto-dungeon">Crypto Dungeon</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
