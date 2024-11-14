import Navbar from "components/Navbar/Navbar";
import styles from "./LabStaffLab.module.css";
// import HODLabTable from "../HODLabTable/HODLabTable";
import LabStaffLabTable from "../LabStaffLabTable/LabStaffLabTable";
import { useContext } from "react";
import AuthContext from "store/authContext";
import AddInventory from "../AddInventory/AddInventory";
const LabStaffLab = ({ inventory, incharge }) => {
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
        <LabStaffLabTable inventories={inventory}></LabStaffLabTable>
        <AddInventory />
      </div>
    </div>
  );
};

export default LabStaffLab;
