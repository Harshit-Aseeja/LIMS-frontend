import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "./StudentLabTable.module.css";
import CartButton from "components/CartButton/CartButton";
import { CartProvider } from "hooks/cartContext";
import ViewCart from "components/viewCart/viewCart";

const StudentLabTable = ({ inventories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("search_by");

  if (!inventories || inventories.length === 0)
    return <div>No inventories</div>;

  const handleExport = () => {
    const table = document.getElementById("table1");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "inventory" });
    XLSX.writeFile(workbook, "student_lab_inventories.xlsx");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
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
    <CartProvider>
      <div className={styles["main"]}>
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
          </div>
          <div className={styles["main-header-download"]}>
            <button
              onClick={handleExport}
              className={styles["main-header-download-button"]}
            >
              Download Excel
            </button>
            <ViewCart />
          </div>
        </div>
        <div className={styles["main-table"]}>
          <table id="table1">
            <thead>
              <tr>
                <td>S.No.</td>
                <td>Instrument Name</td>
                <td>Model Number</td>
                <td>Available Quantity</td>
                <td>Maker</td>
                <td>Specifications</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredInventories.length === 0 ? (
                <tr>
                  <td colSpan="7">No inventories found</td>
                </tr>
              ) : (
                filteredInventories.map((inventory, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{inventory.name}</td>
                    <td>{inventory.model}</td>
                    <td>{inventory.total_qty - inventory.issued_qty}</td>
                    <td>{inventory.maker}</td>
                    <td className={styles["main-table-column-specification"]}>
                      <ol>
                        {Object.keys(inventory.specifications).map((key) => (
                          <li key={key}>{inventory.specifications[key]}</li>
                        ))}
                      </ol>
                    </td>
                    <td>
                      <CartButton
                        inventoryId={index + 1}
                        maxQuantity={inventory.total_qty - inventory.issued_qty}
                        itemName={inventory.name}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CartProvider>
  );
};

export default StudentLabTable;
