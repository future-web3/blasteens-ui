import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import GameView from "./components/GameView/GameView";
import { goerli } from "wagmi/chains";
import { createConfig, WagmiConfig, mainnet, configureChains } from "wagmi";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import config from "./configs";
import { Provider } from "react-redux";
import store from "../src/store/index";

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
    ]
  );

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<div>About Us</div>} />
            <Route path="game-glossary">
              <Route path=":gameId" element={<GameView />} />
            </Route>
            <Route path="crypto-dungeon" element={<div>Crypto Dungeon</div>} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </Provider>
    </WagmiConfig>
  );
}

export default App;
