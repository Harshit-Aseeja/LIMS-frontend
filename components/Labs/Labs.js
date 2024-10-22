import Lab from "components/Lab/Lab";
import styles from "./Labs.module.css";
import AddLab from "components/AddLab/index.js";
import { useContext } from "react";
import AuthContext from "store/authContext";
const Labs = (props) => {
  const authCtx = useContext(AuthContext);
  // props.data is an array of objects with lab details
  console.log("fetching labs");
  return (
    <div className={styles.labs}>
      {props.data &&
        props.data.map((lab, index) => {
          return <Lab key={index} lab={lab} />;
        })}
      {(authCtx.type === "hod" || authCtx.type === "labstaff") && <AddLab />}
    </div>
  );
};

export default Labs;
