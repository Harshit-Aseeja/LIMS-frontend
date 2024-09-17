import Backdrop from "components/Backdrop/Backdrop";
import AddInventoryModal from "./AddInventoryModal/AddInventoryModal";

const AddInventory = (props) => {
  const hideBackdrop = () => {
    props.set_show_add_item(false);
  };
  return (
    <Backdrop>
      <AddInventoryModal hideBackdrop={hideBackdrop}></AddInventoryModal>
    </Backdrop>
  );
};

export default AddInventory;
