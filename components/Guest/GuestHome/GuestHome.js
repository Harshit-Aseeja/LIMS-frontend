import { useContext } from "react";
import styles from "./GuestHome.module.css";
import Navbar from "../Navbar/GuestNavbar";
import Departments from "./Departments";

function GuestHome() {
  console.log("Guest home loaded");
  return (
    <div className={styles["main"]}>
      <Navbar />
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>Departments</div>
        <Departments></Departments>
        {/* {!error && data && <Labs data={data.labs} />} */}
      </div>
    </div>
  );
}

export default GuestHome;
