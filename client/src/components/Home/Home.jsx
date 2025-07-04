import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import NavButton from "../Navigation Button/NavButton.jsx";

function Home() {
  const [boards, setBoards] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/categories/getallcategories`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/boards/getallboards`)
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.boards);
      })
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
      });
  }, []);

  return (
    <main className={styles.containerHome}>
      <section className={styles.containerHeader}>
        <h2>{boards.length}</h2>
        <p>Boards in your current Quiver</p>
        <NavButton destination={"all-boards"} />
      </section>
      <section className={styles.containerCategories}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <a href={`/category/${category.name}`} key={category.id}>
              <div className={styles.category}>
                <div>{category.name}</div>
                <div>
                  <span>{category.board_count} Board(s)</span>
                </div>
                <div>
                  <span>→ See All</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
