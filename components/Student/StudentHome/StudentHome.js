import Navbar from "components/Navbar/Navbar";
import styles from "./StudentHome.module.css";
import Departments from "components/Guest/GuestHome/Departments";

function StudentHome() {
  return (
    <div className={styles["main"]}>
      <Navbar />
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>Departments</div>
        <Departments />
        {/* {!error && data && <Labs data={data.labs} />} */}
      </div>
    </div>
  );
}

export default StudentHome;
