import NavBar from "./components/NavBar/Nav.jsx";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { BoardsContext } from "./components/BoardsContext.js";
import Footer from "./components/Footer/Footer.jsx";
import { CategoriesContext } from "./components/CategoriesContext.js";

function App() {
  const [boards, setBoards] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getallboards`)
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.boards);
      })
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getallcategories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <>
      <BoardsContext.Provider value={boards}>
        <CategoriesContext.Provider value={{ categories, setCategories }}>
          <div className="layout">
            <NavBar />
            <div className="main">
              <Outlet />
            </div>
            <Footer />
          </div>
        </CategoriesContext.Provider>
      </BoardsContext.Provider>
    </>
  );
}

export default App;
