import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<div>Homepage</div>} />
        <Route path="about" element={<div>About Us</div>} />
        <Route
          path="game-glossary"
          element={
            <div>
              Game Glossary
              <div>
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path=":id" element={<div>ID Page</div>} />
        </Route>
        <Route path="crypto-dungeon" element={<div>Crypto Dungeon</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
