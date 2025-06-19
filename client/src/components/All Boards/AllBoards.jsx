import styles from "./AllBoards.module.css";
import { useBoards } from "../BoardsContext";
import Board from "../DisplayBoard/Board";

function AllBoards() {
  const boards = useBoards();

  return (
    <div className={styles.containerBoards}>
      {boards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
    </div>
  );
}

export default AllBoards;
