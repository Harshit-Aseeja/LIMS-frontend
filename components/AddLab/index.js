import styles from "./AddLab.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { useState } from "react";
import AddLabModal from "../AddLabmodal";
const AddLab = () => {
  const [showCreateLab, setShowCreateLab] = useState(false);
  const handleAddLab = () => {
    setShowCreateLab((prevState) => !prevState);
  };
  const hideBackdrop = () => {
    setShowCreateLab(false);
  };
  return (
    <>
      {showCreateLab && (
        <Backdrop hideBackdrop={hideBackdrop}>
          <AddLabModal hideBackdrop={hideBackdrop}></AddLabModal>
        </Backdrop>
      )}
      <div onClick={handleAddLab} className={styles.main}>
        <img src="/images/add_icon.svg"></img>
        <span>Add Lab</span>
        <button>Create New Lab</button>
      </div>
    </>
  );
};

export default AddLab;
