import { Outlet, Link, useParams } from "react-router-dom";
import styles from "./Navbar.module.scss";
import React from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import { emitter } from "../GameView/GameView";

import events from "../../constants/events";

function Navbar() {
  // const { connectAsync, connectors, error } = useConnect();
  // const { address } = useAccount();
  // const { isConnected } = useNetwork();
  //
  // const { gameId } = useParams();
  // const targetGame = gameGlossaryConfigs[`${gameId}`];

  // const handleConnectWallet = async () => {
  //   try {
  //     if (!isConnected) {
  //       await connectAsync({ connector: connectors[0] });
  //     }
  //   } catch (error) {
  //     if (targetGame) {
  //       emitter.emit(events.AUTH_FAILED);
  //     }
  //   }
  // };

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
