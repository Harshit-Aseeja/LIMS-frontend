import styles from "./AddLabModal.module.css";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/use-http";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/authContext";

const AddLabModal = (props) => {
  const labName = useInput({ initialValue: "" });
  const Lab_Incharge_Email = useInput({ initialValue: "" });
  const Lab_Room = useInput({ initialValue: "" });
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { data, post, error, loading } = useHttp();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      labName.value === "" ||
      Lab_Incharge_Email.value === "" ||
      Lab_Room.value === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (!Lab_Incharge_Email.value.endsWith("@lnmiit.ac.in")) {
      alert("Email should be of lnmiit domain");
      return;
    }
    if (Lab_Incharge_Email.value.includes(" ")) {
      alert("Email should not contain any spaces");
      return;
    }

    // get the department name from the url
    const dept_name = authCtx.details?.dept;

    //will have to use validator in future, refactoring required
    //handle submit
    const labData = {
      labName: labName.value,
      Lab_Incharge_Email: Lab_Incharge_Email.value,
      Lab_Room: Lab_Room.value,
      dept_name: dept_name,
    };
    const makeRequest = async () => {
      const response = await post({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/hod/labs",
        headers: {
          authorization: authCtx.token,
        },
        body: labData,
      });
    };
    makeRequest();
  };

  useEffect(() => {
    if (data) {
      alert(data.message);
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
        <h1>Add a Lab</h1>
      </div>
      <div className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="labName">Lab Name</label>
          <input
            onChange={labName.onChangeHandler}
            type="text"
            id="labName"
            name="labName"
            placeholder="Enter Lab Name"
          ></input>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="Lab_Incharge_Email">Lab Incharge Email</label>
          <input
            onChange={Lab_Incharge_Email.onChangeHandler}
            type="email"
            id="Lab_Incharge_Email"
            name="Lab_Incharge_Email"
            placeholder="labincharge@lnmiit.ac.in"
          ></input>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="Lab_Room">Lab Room</label>
          <input
            onChange={Lab_Room.onChangeHandler}
            type="text"
            id="Lab_Room"
            name="Lab_Room"
            placeholder="Enter Lab Room Number"
          ></input>
        </div>
      </div>
      <button onClick={handleSubmit} className={styles["btn-create-lab"]}>
        Create Lab
      </button>
    </div>
  );
};

export default AddLabModal;
