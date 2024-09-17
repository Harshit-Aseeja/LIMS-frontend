import Backdrop from "components/Backdrop/Backdrop";
import EditInventoryModal from "./EditInventoryModal/EditInventoryModal";

const EditInventory = (props) => {
  const hideBackdrop = () => {
    props.set_edit_id(null);
  };
  return (
    <Backdrop>
      <EditInventoryModal
        inventory={props.inventory}
        id={props.id}
        hideBackdrop={hideBackdrop}
      ></EditInventoryModal>
    </Backdrop>
  );
};

export default EditInventory;
