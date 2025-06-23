import styles from "./Board.module.css";
import { Link } from "react-router";
import secretPassword from "../secretPassword.js";

function Board({ board, onDelete }) {
  console.log(board);
  const handleDeleteBoard = async (e) => {
    e.preventDefault();

    let password = secretPassword();
    if (!password) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/deleteboard`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: board.id }),
        }
      );

      if (res.ok) {
        onDelete(board.id);
      } else {
        console.error("Failed to delete Board.");
      }
    } catch (err) {
      console.error("Error deleting board: ", err);
    }
  };

  return (
    <div key={board.id} className={styles.board}>
      <p className={styles.boardName}>{board.name}</p>
      <p className={styles.boardName}>
        {board.size}, {board.volume} Liters
      </p>
      <p className={styles.boardBrand}>by {board.brand_name}</p>
      <p>Bought for {board.price}€</p>
      <p>
        used for:{" "}
        <Link
          to={`/category/${board.category_name}`}
          className={styles.categoryLink}
        >
          {" "}
          {board.category_name}
        </Link>
      </p>
      <hr />
      <div className={styles.containerBtns}>
        <Link
          to={`/edit-board/${board.name}`}
          state={{ board }}
          className={`${styles.btn} ${styles.edit}`}
        >
          Edit
        </Link>
        <button
          onClick={handleDeleteBoard}
          className={`${styles.btn} ${styles.delete}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Board;
