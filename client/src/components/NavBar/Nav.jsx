import logo from "../../assets/myquiver_logo.png";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className={styles.containerNav}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.containerLinks}>
        <Link to="/add-board">Add Board</Link>
        <Link to="/add-category">Add Category</Link>
      </div>
    </nav>
  );
}

export default NavBar;
