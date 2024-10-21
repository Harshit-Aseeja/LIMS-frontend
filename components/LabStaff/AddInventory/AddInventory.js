import Backdrop from "components/Backdrop/Backdrop";
import AddInventoryModal from "./AddInventoryModal/AddInventoryModal";
import styles from "./AddInventory.module.css";
import { useState } from "react";

const AddInventory = () => {
  const [showCreateInventory, setShowCreateInventory] = useState(false);
  const handleAddInventory = () => {
    setShowCreateInventory((prevState) => !prevState);
  };
  const hideBackdrop = () => {
    setShowCreateInventory(false);
  };
  return (
    <>
      {showCreateInventory && (
        <Backdrop hideBackdrop={hideBackdrop}>
          <AddInventoryModal hideBackdrop={hideBackdrop}></AddInventoryModal>
        </Backdrop>
      )}
      <div onClick={handleAddInventory} className={styles.main}>
        <img src="/images/add_icon.svg"></img>
        <span>Add Inventory</span>
        <button>Create New Inventory</button>
      </div>
    </>
  );
};

export default AddInventory;
