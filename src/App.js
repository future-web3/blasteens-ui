import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Arcade from "./pages/Arcade/Arcade";
import { goerli } from "wagmi/chains";
import { createConfig, WagmiConfig, mainnet, configureChains } from "wagmi";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import config from "./configs";
import { GameProvider } from "phaser-simple-game-sdk";

function App() {
  const { publicClient } = configureChains(
    [goerli, mainnet],
    [
      jsonRpcProvider({
        rpc: () => ({
          //TODO
          http: `https://eth-goerli.g.alchemy.com/v2/${config.alchemyKey}`,
        }),
      }),
    ],
  );

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<div>About Us</div>} />
            <Route path="arcade">
              <Route path=":gameId" element={<Arcade />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </GameProvider>
    </WagmiConfig>
  );
}

export default App;
