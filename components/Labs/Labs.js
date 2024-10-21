import Lab from "components/Lab/Lab";
import styles from "./Labs.module.css";
import AddLab from "components/AddLab/index.js";
const Labs = (props) => {
  // props.data is an array of objects with lab details
  console.log("fetching labs");
  return (
    <div className={styles.labs}>
      {props.data &&
        props.data.map((lab, index) => {
          return <Lab key={index} lab={lab} />;
        })}
      <AddLab />
    </div>
  );
};

export default Labs;
