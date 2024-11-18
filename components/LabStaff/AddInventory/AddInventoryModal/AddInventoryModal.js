import React, { useEffect } from "react";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
import useHttp from "../../../../hooks/use-http";
import useInput from "../../../../hooks/useInput";
import styles from "./AddInventoryModal.module.css";

const AddInventoryModal = (props) => {
  const lab_id = JSON.parse(localStorage.getItem("details")).lab_id;
  const instrument_name = useInput({ initialValue: "" });
  const model = useInput({ initialValue: "" });
  const total_quantity = useInput({ initialValue: "" });
  const maker = useInput({ initialValue: "" });
  const specifications = useInput({ initialValue: "" });
  const router = useRouter();
  const { data, post, error, loading, put } = useHttp();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inventory_data = {
      name: instrument_name.value,
      model: model.value,
      total_qty: total_quantity.value,
      maker: maker.value,
      specifications: specifications.value,
      lab_id: lab_id,
    };
    console.log(inventory_data);
    const makeRequest = async () => {
      await post({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/" + lab_id,
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: inventory_data,
      });
    };
    makeRequest();
  };

  useEffect(() => {
    if (data) {
      alert("Inventory Added successfully!");
      props.hideBackdrop();
      router.reload();
    }
    if (error) alert(error);
  }, [data, error]);

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      json.forEach(async (row) => {
        // Parsing the specifications and converting them into a JSON object
        const specifications = row["Specifications"];
        let specificationsJson = {};

        if (specifications) {
          const specsArray = specifications.split(","); // Assuming each specification is separated by a comma
          specificationsJson = specsArray.reduce((acc, spec, index) => {
            acc[index + 1] = spec.trim(); // Create JSON key-value pairs where keys are 1, 2, 3, etc.
            return acc;
          }, {});
        }

        const inventory_data = {
          name: row["Instrument Name"],
          model: row["Model Number"],
          total_qty: row["Total Quantity"],
          maker: row["Maker"],
          specifications: specificationsJson, // Store specifications as a JSON object
          lab_id: lab_id,
        };

        await post({
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "/inventory/" + lab_id,
          headers: {
            authorization: localStorage.getItem("token"),
          },
          body: inventory_data,
        });
      });
      alert("Inventory items added successfully from Excel file!");
      props.hideBackdrop();
      router.reload();
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.main}>
      <div onClick={props.hideBackdrop} className={styles.close}>
        <img src="/images/close.svg" alt="Close" />
      </div>
      <div className={styles.title}>
        <h1>Add Inventory</h1>
        <button className={styles["btn-add-excel"]}>
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            Add using Excel
          </label>
        </button>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className={styles["input-file"]}
        />
      </div>
      <div className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="instrument_name">Instrument Name</label>
          <input
            onChange={instrument_name.onChangeHandler}
            type="text"
            id="instrument_name"
            name="instrument_name"
            value={instrument_name.value}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="model">Model Number</label>
          <input
            onChange={model.onChangeHandler}
            type="text"
            id="model"
            name="model"
            value={model.value}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="total_quantity">Total Quantity</label>
          <input
            onChange={total_quantity.onChangeHandler}
            type="text"
            id="total_quantity"
            name="total_quantity"
            value={total_quantity.value}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="maker">Maker</label>
          <input
            onChange={maker.onChangeHandler}
            type="text"
            id="maker"
            name="maker"
            value={maker.value}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="specifications">Specifications</label>
          <input
            onChange={specifications.onChangeHandler}
            type="text"
            id="specifications"
            name="specifications"
            value={specifications.value}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={styles["btn-create-department"]}
      >
        Save
      </button>
    </div>
  );
};

export default AddInventoryModal;
