import ReactHTMLTableToExcel from "react-html-table-to-excel";
import styles from "./StudentLabTable.module.css";
import CartButton from "components/CartButton/CartButton";
import { CartProvider } from "hooks/cartContext";
import viewCart from "components/viewCart/viewCart";

const StudentLabTable = ({ inventories }) => {
  if (!inventories || inventories.length === 0)
    return <div>No inventories</div>;
  return (
    <CartProvider>
      <div className={styles["main"]}>
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
            <button className={styles["main-header-search-button"]}>
              Search
            </button>
          </div>
          <div className={styles["main-header-download"]}>
            <viewCart />
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
                {/* <td>Total Quantity</td> */}
                <td>Maker</td>
                <td>Specifications</td>
                <td>Action</td>
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
                    {/* <td>{inventory.total_qty}</td> */}
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
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CartProvider>
  );
};

export default StudentLabTable;
