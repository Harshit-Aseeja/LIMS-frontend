import styles from "./IssueInventoryModal.module.css";
import useHttp from "../../../../hooks/use-http";
import useInput from "../../../../hooks/useInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SelectedItemTable from "./SelectedItemTable/SelectedItemTable";

const IssueInventory = (props) => {
  const student_name = useInput({ initialValue: "" });
  const student_roll_no = useInput({ initialValue: "" });
  const date = useInput({ initialValue: "" });
  const [issued_items, set_issued_items] = useState({});
  // console.log(props.inventories);
  const selected_item_listener = (event) => {
    if (issued_items[event.target.value]) {
      return;
    } else if (event.target.value != "null") {
      set_issued_items({
        ...issued_items,
        [event.target.value]: {
          name: props.inventories[event.target.value].name,
          model: props.inventories[event.target.value].model,
          quantity: 0,
          id: props.inventories[event.target.value].id,
          max_quantity:
            props.inventories[event.target.value].total_qty -
            props.inventories[event.target.value].issued_qty,
        },
      });
    }
  };
  const updateQuantity = (key, value) => {
    if (value > issued_items[key].max_quantity) {
      alert(
        `Quantity cannot be greater than available quantity which is 
        ${issued_items[key].max_quantity}`
      );
      return;
    }
    const new_issued_items = { ...issued_items };
    new_issued_items[key].quantity = value;
    set_issued_items(new_issued_items);
  };
  const remove_item_listener = (key) => {
    const new_issued_items = { ...issued_items };
    delete new_issued_items[key];
    set_issued_items(new_issued_items);
  };
  const router = useRouter();
  const { data, post, error, loading, put } = useHttp();
  const handleSubmit = (event) => {
    event.preventDefault();
    const issue_data = {
      student_name: student_name.value,
      student_roll_no: student_roll_no.value,
      date: date.value,
      lab_id: JSON.parse(localStorage.getItem("details")).lab_id,
      //extract id,quantity from issued_items
      issued_items: Object.keys(issued_items).map(function (keyName, keyIndex) {
        return {
          id: issued_items[keyName].id,
          quantity: issued_items[keyName].quantity,
        };
      }),
    };
    // console.log(issue_data);
    const makeRequest = async () => {
      const response = await post({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/issue",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: issue_data,
      });
    };
    makeRequest();
  };
  useEffect(() => {
    if (data && data.status === 200) {
      // console.log(data);
      alert("Inventory issued successfully!");
      // props.hideBackdrop();
      router.reload();
    }
    if (error) alert(error);
  }, [data, error]);
  return (
    <div className={styles.main}>
      <div onClick={props.hideBackdrop} className={styles.close}>
        <img src="/images/close.svg"></img>
      </div>
      <div className={styles.title}>
        <h1>Issue Inventory</h1>
      </div>
      <div className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="student_name">Student Name</label>
          <input
            onChange={student_name.onChangeHandler}
            type="text"
            id="student_name"
            name="student_name"
            value={student_name.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="student_roll_no">Roll Number</label>
          <input
            onChange={student_roll_no.onChangeHandler}
            type="text"
            id="student_roll_no"
            name="student_roll_no"
            value={student_roll_no.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="date">Date</label>
          <input
            onChange={date.onChangeHandler}
            type="date"
            id="date"
            name="date"
            value={date.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="items">Select Instrument:</label>
          <select
            onClick={selected_item_listener}
            type="select"
            id="items"
            name="items"
          >
            <option value="null">Select</option>
            {props.inventories.map((inventory, index) => (
              <option value={index}>
                {inventory.name} - {inventory.model}
              </option>
            ))}
          </select>
        </div>
      </div>
      {Object.keys(issued_items).length != 0 && (
        <SelectedItemTable
          updateQuantity={updateQuantity}
          remove_item_listener={remove_item_listener}
          items={issued_items}
        ></SelectedItemTable>
      )}
      <button
        onClick={handleSubmit}
        className={styles["btn-create-department"]}
      >
        Save
      </button>
    </div>
  );
};

export default IssueInventory;
