import Navbar from "components/Navbar/Navbar";
import styles from "./IssuedInventory.module.css";
import { useContext, useEffect } from "react";
import AuthContext from "store/authContext";
import IssuedInvetoryTable from "../IssuedInventoryTable/IssuedInventoryTable";
import useHttp from "hooks/use-http";
const IssuedInventory = (props) => {
  const authCtx = useContext(AuthContext);
  const { data, loading, error, post, get } = useHttp();
  const lab_id = authCtx.details.lab_id;
  useEffect(() => {
    if (authCtx.type === "labstaff") {
      get({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/issue/" + lab_id,
        body: { email: authCtx.details.email },
      });
    }
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data.data);
      //   alert(data.message);
    }
  }, [data]);
  return (
    <div className={styles["main"]}>
      {authCtx && authCtx.details && authCtx.details.name && <Navbar />}
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>Issued Inventory</div>
        {data && data.data && (
          <IssuedInvetoryTable data={data.data}></IssuedInvetoryTable>
        )}
      </div>
    </div>
  );
};

export default IssuedInventory;
