import styles from "./StudentLab.module.css";
import Navbar from "components/Navbar/Navbar";
import StudentLabTable from "./StudentLabTable";
import { useContext } from "react";
import AuthContext from "store/authContext";
const StudentLab = ({ inventory, incharge }) => {
  //console.log("Student Lab is called!");
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles["main"]}>
      {authCtx && authCtx.details && authCtx.details.name && <Navbar />}
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>
          {incharge?.labName}
        </div>
        <div className={styles["main-content-details"]}>
          <div className={styles["main-content-details-group"]}>
            <div className={styles["main-content-details-group-label"]}>
              Lab Incharge :
            </div>
            <div className={styles["main-content-details-group-value"]}>
              {incharge.name}
            </div>
          </div>
          <div className={styles["main-content-details-group"]}>
            <div className={styles["main-content-details-group-label"]}>
              Contact No. :
            </div>
            <div className={styles["main-content-details-group-value"]}>
              {incharge.mobile}
            </div>
          </div>
          <div className={styles["main-content-details-group"]}>
            <div className={styles["main-content-details-group-label"]}>
              Email ID :
            </div>
            <div className={styles["main-content-details-group-value"]}>
              {incharge.email}
            </div>
          </div>
          <div className={styles["main-content-details-group"]}>
            <div className={styles["main-content-details-group-label"]}>
              Lab Location :
            </div>
            <div className={styles["main-content-details-group-value"]}>
              {incharge.location}
            </div>
          </div>
        </div>
        <StudentLabTable inventories={inventory}></StudentLabTable>
      </div>
    </div>
  );
};

export default StudentLab;
