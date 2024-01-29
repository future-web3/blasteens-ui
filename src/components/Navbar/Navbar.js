import { Outlet, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import React from "react";

function Navbar() {
  return (
    <div className={styles.navBarContainer}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/game-glossary/escape-from-germs">Germs</Link>
        </li>
        <li>
          <Link to="/game-glossary/tommy-jumping">Tom</Link>
        </li>
        <li>
          <Link to="/game-glossary/snowman-defender">Snowman</Link>
        </li>
        <li>
          <Link to="/game-glossary/emoji-match">Emoji</Link>
        </li>
        <li>
          <Link to="/crypto-dungeon">Crypto Dungeon</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Navbar;
