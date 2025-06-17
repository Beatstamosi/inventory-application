import logo from "../../assets/myquiver_logo.png";
import styles from "./Nav.module.css";

function NavBar() {
  return (
    <nav>
      <div className={styles.containerNav}>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <a href="/add-board">Add Board</a>
        <a href="/add-category">Add Category</a>
      </div>
    </nav>
  );
}

export default NavBar;
