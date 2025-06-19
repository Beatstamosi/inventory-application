import styles from "./displayCategory.module.css";
import { useBoards } from "../BoardsContext";
import { useParams } from "react-router";
import Board from "../DisplayBoard/Board";

function DisplayCategory() {
  const boards = useBoards();
  let category = useParams().name;

  let showBoards = boards.filter((board) => board.category_name === category);

  return (
    <div className={styles.containerBoards}>
      {showBoards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
    </div>
  );
}

export default DisplayCategory;
