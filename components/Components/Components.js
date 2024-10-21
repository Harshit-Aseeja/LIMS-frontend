import styles from "./Labs.module.css";
import AddLab from "components/AddLab/index.js";
import Component from "components/Component/Components";
const Components = (props) => {
  // props.data is an array of objects with lab details
  console.log("fetching components");
  return (
    <div className={styles.components}>
      {props.data &&
        props.data.map((component, index) => {
          return <Component key={index} component={component} />;
        })}
      <AddLab />
    </div>
  );
};

export default Components;
