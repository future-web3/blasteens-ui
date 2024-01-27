import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import GameView from "./components/GameView/GameView";
import { goerli } from "wagmi/chains";
import { createConfig, WagmiConfig } from "wagmi";
import config from "./configs";

function App() {
  const networkConfig = createConfig({
    chains: [goerli],
    publicClient: { key: config.alchmeyKey },
  });

  return (
    <WagmiConfig config={networkConfig}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<div>Homepage</div>} />
          <Route path="about" element={<div>About Us</div>} />
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
