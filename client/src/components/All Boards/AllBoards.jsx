import styles from "./AllBoards.module.css";
import { useState, useEffect } from "react";
import Board from "../DisplayBoard/Board";

function AllBoards() {
  const [boards, setBoards] = useState([]);

  const handleBoardDelete = (deleteId) => {
    setBoards((prevBoards) => prevBoards.filter((b) => b.id != deleteId));
  };

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
    <div className={styles.containerBoards}>
      {boards.map((board) => (
        <Board board={board} onDelete={handleBoardDelete} key={board.id} />
      ))}
    </div>
  );
}

export default AllBoards;
