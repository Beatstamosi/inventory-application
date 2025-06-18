import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/Beatstamosi" target="blank">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/github.png"
          alt="github"
        />
      </a>
      <span>Moritz Bormann</span>
    </div>
  );
}

export default Footer;
