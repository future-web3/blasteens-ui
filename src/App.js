import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import GameView from "./components/GameView/GameView";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
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
  );
}

export default App;
