import Backdrop from "components/Backdrop/Backdrop";
import IssueInventoryModal from "./IssueInventoryModal/IssueInventoryModal";

const IssueInventory = (props) => {
  const hideBackdrop = () => {
    props.set_show_issue(null);
  };
  return (
    <Backdrop>
      <IssueInventoryModal
        inventories={props.inventories}
        hideBackdrop={hideBackdrop}
      ></IssueInventoryModal>
    </Backdrop>
  );
};

export default IssueInventory;
