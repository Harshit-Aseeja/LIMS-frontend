import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.text_center}>
        <span className={styles["lds-dual-ring"]}></span>
      </div>
    </div>
  );
};

export default Loader;
