import NavBar from "./components/NavBar/Nav.jsx";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { BoardsContext } from "./components/BoardsContext.js";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getallboards`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Boards:", data.boards);
        setBoards(data.boards);
      })
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
      });
  }, []);

  return (
    <>
      <BoardsContext.Provider value={boards}>
        <NavBar />
        <Outlet />
      </BoardsContext.Provider>
    </>
  );
}

export default App;
