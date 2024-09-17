import Backdrop from "components/Backdrop/Backdrop";
import styles from "./LabStaffLabTable.module.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import EditInventory from "../EditInventory/EditInventory";
import { useState } from "react";
import IssueInventory from "../IssueInventory/IssueInventory";
import AddInventory from "../AddInventory/AddInventory";
const LabStaffLabTable = ({ inventories }) => {
  const [show_issue, set_show_issue] = useState(false);
  const [edit_id, set_edit_id] = useState(null);
  const [show_add_item, set_show_add_item] = useState(false);
  if (!inventories || inventories.length === 0)
    return <div>No inventories</div>;
  return (
    <div className={styles["main"]}>
      {show_issue && (
        <IssueInventory
          inventories={inventories}
          set_show_issue={set_show_issue}
        ></IssueInventory>
      )}
      {edit_id != null && (
        <EditInventory
          set_edit_id={set_edit_id}
          inventory={inventories[edit_id]}
        ></EditInventory>
      )}
      {show_add_item && (
        <AddInventory set_show_add_item={set_show_add_item}></AddInventory>
      )}
      <div className={styles["main-header"]}>
        <div className={styles["main-header-title"]}>Lab Inventories</div>
        <div className={styles["main-header-search"]}>
          <select
            className={styles["main-header-select"]}
            name="cars"
            id="cars"
          >
            <option value="search_by">Search by</option>
            <option value="1">Instrument Name</option>
            <option value="2">Model Number</option>
          </select>
          <div className={styles["main-header-search-bar"]}>
            <img src="/images/search.svg"></img>
            <input type="text" placeholder="Search"></input>
          </div>
          <button
            className={styles["main-header-search-button"]}
            onClick={() => set_show_add_item(true)}
          >
            Add Item
          </button>
          <button
            className={styles["main-header-search-button"]}
            onClick={() => set_show_issue(true)}
          >
            Issue
          </button>
        </div>
        <div className={styles["main-header-download"]}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className={styles["main-header-download-button"]}
            table="table1"
            filename="tablexls" //change this filename
            sheet="inventory"
            buttonText="Download Excel"
          />
        </div>
      </div>
      <div className={styles["main-table"]}>
        <table id="table1">
          <thead>
            <tr>
              <td>S.No.</td>
              <td>Instrument Name</td>
              <td>Model Number</td>
              <td>Remaining Quantity</td>
              <td>Total Quantity</td>
              <td>Maker</td>
              <td>Specifications</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{inventory.name}</td>
                  <td>{inventory.model}</td>
                  <td>{inventory.total_qty - inventory.issued_qty}</td>
                  <td>{inventory.total_qty}</td>
                  <td>{inventory.maker}</td>
                  <td className={styles["main-table-column-specification"]}>
                    <ol>
                      {Object.keys(inventory.specifications).map((key) => (
                        <li key={key}>{inventory.specifications[key]}</li>
                      ))}
                    </ol>
                  </td>
                  <td>
                    <button onClick={() => set_edit_id(index)}>Edit</button>
                    {/* <button>Issue</button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabStaffLabTable;
