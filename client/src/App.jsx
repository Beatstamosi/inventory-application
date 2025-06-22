import NavBar from "./components/NavBar/Nav.jsx";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer.jsx";
import { CategoriesContext } from "./components/CategoriesContext.js";

function App() {
  const [categories, setCategories] = useState([]);

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
      <CategoriesContext.Provider value={{ categories, setCategories }}>
        <div className="layout">
          <NavBar />
          <div className="main">
            <Outlet />
          </div>
          <Footer />
        </div>
      </CategoriesContext.Provider>
    </>
  );
}

export default App;
