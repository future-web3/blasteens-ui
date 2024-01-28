import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import GameView from "./components/GameView/GameView";
import Homepage from "./Pages/Homepage/Homepage";
import { goerli } from "wagmi/chains";
import { createConfig, WagmiConfig, mainnet } from "wagmi";
import config from "./configs";

function App() {
  const networkConfig = createConfig({
    chains: [goerli],
    publicClient: { key: config.alchmeyKey },
  });

  return (
    <WagmiConfig config={networkConfig}>
      <Routes>
        <Route path="/" element={<Navbar></Navbar>}>
          <Route path="Homepage" element={<Homepage/>} />
          <Route path="market-place" element={<div>MarketPlace</div>} />
          <Route path="game-glossary">
            <Route path=":gameId" element={<GameView />} />
          </Route>
          <Route path="crypto-dungeon" element={<div>Crypto Dungeon</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </WagmiConfig>
  );
}

export default App;
