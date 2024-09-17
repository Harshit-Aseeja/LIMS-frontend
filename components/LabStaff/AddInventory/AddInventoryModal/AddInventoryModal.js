import styles from "./AddInventoryModal.module.css";
import useHttp from "../../../../hooks/use-http";
import useInput from "../../../../hooks/useInput";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
      specifications: JSON.parse(specifications.value),
      lab_id: lab_id,
      //could've parsed to json but let's see if this works
    };
    console.log(inventory_data);
    const makeRequest = async () => {
      const response = await post({
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

  return (
    <div className={styles.main}>
      <div onClick={props.hideBackdrop} className={styles.close}>
        <img src="/images/close.svg"></img>
      </div>
      <div className={styles.title}>
        <h1>Add Inventory</h1>
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
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="model">Model Number</label>
          <input
            onChange={model.onChangeHandler}
            type="text"
            id="model"
            name="model"
            value={model.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="total_quantity">Total Quantity</label>
          <input
            onChange={total_quantity.onChangeHandler}
            type="text"
            id="total_quantity"
            name="total_quantity"
            value={total_quantity.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="maker">Maker</label>
          <input
            onChange={maker.onChangeHandler}
            type="text"
            id="maker"
            name="maker"
            value={maker.value}
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="specifications">Specifications</label>
          <input
            onChange={specifications.onChangeHandler}
            type="text"
            id="specifications"
            name="specifications"
            value={specifications.value}
          ></input>
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
