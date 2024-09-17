import { useContext } from "react";
import AuthContext from "store/authContext";
import styles from "./styles/Issued.module.css";
import LabStaffHome from "components/LabStaff/LabStaffHome/LabStaffHome";
import Error from "components/ErrorPage/Error";
import IssuedInventory from "components/LabStaff/IssuedInventory/IssuedInventory";
const Issued = () => {
  const authCtx = useContext(AuthContext);
  const page = (
    <div className={styles["main"]}>
      {authCtx.type === "labstaff" ? <IssuedInventory /> : <Error />}
    </div>
  );

  return page;
};

export default Issued;
