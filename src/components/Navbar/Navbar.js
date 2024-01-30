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
          <Link to="/arcade/escape-from-germs">Germs</Link>
        </li>
        <li>
          <Link to="/arcade/tommy-jumping">Tom</Link>
        </li>
        <li>
          <Link to="/arcade/snowman-defender">Snowman</Link>
        </li>
        <li>
          <Link to="/arcade/emoji-match">Emoji</Link>
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
