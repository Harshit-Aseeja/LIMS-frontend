import React, { useState } from "react";
import * as XLSX from "xlsx";
import EditInventory from "../EditInventory/EditInventory";
import IssueInventory from "../IssueInventory/IssueInventory";
import AddInventory from "../AddInventory/AddInventory";
import styles from "./LabStaffLabTable.module.css";

const LabStaffLabTable = ({ inventories }) => {
  const [show_issue, set_show_issue] = useState(false);
  const [edit_id, set_edit_id] = useState(null);
  const [show_add_item, set_show_add_item] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("search_by");

  if (!inventories || inventories.length === 0)
    return <div>No inventories</div>;

  const handleExport = () => {
    const table = document.getElementById("table1");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "inventory" });
    XLSX.writeFile(workbook, "lab_inventories.xlsx");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const sendEmail = async (emailData) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  const handleNotify = (inventory) => {
    const emailData = {
      to: inventory.studentEmail,
      subject: "Reminder to Return Lab Items",
      body: `Dear Student,\n\nPlease return the following items to the lab:\n\n${JSON.stringify(
        inventory
      )}\n\nThank you.`,
    };
    sendEmail(emailData);
  };

  const handleApprove = (inventory) => {
    const emailData = {
      to: inventory.studentEmail,
      subject: "Request Approved",
      body: `Dear Student,\n\nYour request for the following items has been approved. You can collect them from the lab:\n\n${JSON.stringify(
        inventory
      )}\n\nThank you.`,
    };
    sendEmail(emailData);
  };

  const handleComplete = (inventory) => {
    const emailData = {
      to: inventory.studentEmail,
      subject: "Items Received",
      body: `Dear Student,\n\nWe have received the following items back in the lab:\n\n${JSON.stringify(
        inventory
      )}\n\nThank you.`,
    };
    sendEmail(emailData);
  };

  const filteredInventories = inventories.filter((inventory) => {
    if (searchCriteria === "1" && searchQuery) {
      return inventory.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchCriteria === "2" && searchQuery) {
      return inventory.model.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true; // If no search criteria is selected or no query is entered, show all inventories
  });

  return (
    <div className={styles.main}>
      {show_issue && (
        <IssueInventory
          inventories={inventories}
          set_show_issue={set_show_issue}
        />
      )}
      {edit_id != null && (
        <EditInventory
          set_edit_id={set_edit_id}
          inventory={inventories[edit_id]}
        />
      )}
      {show_add_item && <AddInventory set_show_add_item={set_show_add_item} />}
      <div className={styles["main-header"]}>
        <div className={styles["main-header-title"]}>Lab Inventories</div>
        <div className={styles["main-header-search"]}>
          <select
            className={styles["main-header-select"]}
            name="search_by"
            id="search_by"
            onChange={handleSearchCriteriaChange}
          >
            <option value="search_by">Search by</option>
            <option value="1">Instrument Name</option>
            <option value="2">Model Number</option>
          </select>
          <div className={styles["main-header-search-bar"]}>
            <img src="/images/search.svg" alt="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
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
          <button
            onClick={handleExport}
            className={styles["main-header-download-button"]}
          >
            Download Excel
          </button>
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
            {filteredInventories.length === 0 ? (
              <tr>
                <td colSpan="8">No inventories found</td>
              </tr>
            ) : (
              filteredInventories.map((inventory, index) => (
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
                    {inventory.status === "pending" && (
                      <button onClick={() => handleApprove(inventory)}>
                        Approve
                      </button>
                    )}
                    {inventory.status === "ongoing" && (
                      <button onClick={() => handleNotify(inventory)}>
                        Notify
                      </button>
                    )}
                    {inventory.status === "complete" && (
                      <button onClick={() => handleComplete(inventory)}>
                        Complete
                      </button>
                    )}
                    <button onClick={() => set_edit_id(index)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabStaffLabTable;
