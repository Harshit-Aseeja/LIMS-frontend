import Backdrop from "components/Backdrop/Backdrop";
import styles from "./IssuedInventoryTable.module.css";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import useHttp from "hooks/use-http";
import { useRouter } from "next/router";

const IssuedInventoryTable = ({ data }) => {
  const router = useRouter();
  const { data: res, loading, error, get, post } = useHttp();
  const {
    data: res2,
    loading: loading2,
    error: error2,
    get: get2,
    post: post2,
  } = useHttp();

  const send_email_to_notify = (index) => {
    const body = {
      name: data[index].student_name,
      roll_no: data[index].student_roll_no,
      date: data[index].date,
      items: data[index].items,
      lab_id: JSON.parse(localStorage.getItem("details")).lab_id,
    };
    const make_request = async () => {
      await post({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/notify",
        body: body,
      });
    };
    make_request();
  };

  const return_item = (index) => {
    const body = {
      lab_id: JSON.parse(localStorage.getItem("details")).lab_id,
      issue_id: data[index].id,
    };
    const make_request = async () => {
      await post2({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/return",
        body: body,
      });
    };
    make_request();
  };

  useEffect(() => {
    if (res) {
      alert(res.message);
      router.reload();
    }
  }, [res]);

  useEffect(() => {
    if (res2) {
      alert(res2.message);
      router.reload();
    }
  }, [res2]);

  const handleExport = () => {
    const table = document.getElementById("table1");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "inventory" });
    XLSX.writeFile(workbook, "issued_inventory.xlsx");
  };

  if (!data || data.length === 0) return <div>No issued items</div>;

  return (
    <div className={styles["main"]}>
      <div className={styles["main-header"]}>
        <div className={styles["main-header-title"]}>Lab Inventories</div>
        <div className={styles["main-header-search"]}>
          <select
            className={styles["main-header-select"]}
            name="search_by"
            id="search_by"
          >
            <option value="search_by">Search by</option>
            <option value="1">Instrument Name</option>
            <option value="2">Model Number</option>
          </select>
          <div className={styles["main-header-search-bar"]}>
            <img src="/images/search.svg" alt="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
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
              <td>Student Name</td>
              <td>Roll Number</td>
              <td>Date & Time</td>
              <td colSpan={2}>Items</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{item.student_name}</td>
                <td>{item.student_roll_no}</td>
                <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                <td className={styles["main-table-column-specification"]}>
                  <ul>
                    {item.items &&
                      Object.keys(item.items).map((key) => (
                        <li key={key}>
                          {item.items[key].name +
                            "  x  " +
                            item.items[key].quantity}
                        </li>
                      ))}
                  </ul>
                </td>
                <td></td>
                <td>
                  <button onClick={() => send_email_to_notify(index)}>
                    Notify
                  </button>
                  <button onClick={() => return_item(index)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedInventoryTable;
