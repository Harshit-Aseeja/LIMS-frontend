import ReactHTMLTableToExcel from "react-html-table-to-excel";
import styles from "./StudentLabTable.module.css";

const StudentLabTable = ({ inventories }) => {
  if (!inventories || inventories.length === 0)
    return <div>No inventories</div>;
  return (
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
          {/* <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className={styles["main-header-download-button"]}
            table="table1"
            filename="tablexls" //change this filename
            sheet="inventory"
            buttonText="Download Excel"
          /> */}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLabTable;
