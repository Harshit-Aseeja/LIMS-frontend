import Navbar from "components/Navbar/Navbar";
import styles from "./AdminHome.module.css";
import Departments from "components/Guest/GuestHome/Departments";

function AdminHome() {
  return (
    <div className={styles["main"]}>
      <Navbar />
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>Departments</div>
        <Departments />
      </div>
    </div>
  );
}

export default AdminHome;
