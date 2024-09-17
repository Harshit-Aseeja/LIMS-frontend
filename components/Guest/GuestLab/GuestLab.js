import styles from "./GuestLab.module.css";
import GuestLabTable from "../GuestLabTable/GuestLabTable";
import Navbar from "../Navbar/Navbar";
const HODLab = ({ inventory, incharge }) => {
  return (
    <div className={styles["main"]}>
      <Navbar></Navbar>
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>{incharge.labName}</div>
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
        <GuestLabTable inventories={inventory}></GuestLabTable>
      </div>
    </div>
  );
};

export default HODLab;
