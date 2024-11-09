import React, { useContext, useEffect, useState } from "react";
import styles from "./CartModal.module.css";
import useHttp from "hooks/use-http";
import { useRouter } from "next/router";
import AuthContext from "store/authContext";
import CartContext from "hooks/cartContext";

const CartModal = (props) => {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { data, post, error, loading } = useHttp();

  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(""); // Store start date
  const [endDate, setEndDate] = useState(""); // Store end date

  // Extract labId from the URL
  const { query } = router;
  console.log(query);
  const labId = query.lab_id;

  const handleIssue = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    console.log(authCtx.details);

    const dept_name = authCtx.details?.dept;
    const studentId = authCtx.details?.roll_number; // Get student roll number

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    console.log("lab id: " + labId + " student id: " + studentId);

    if (!labId || !studentId) {
      alert("Lab ID and student roll number are required to issue items.");
      return;
    }

    const cartData = cart.map((item) => ({
      inventoryId: item.inventoryId,
      quantity: item.quantity,
      dept_name: dept_name,
    }));

    const makeRequest = async () => {
      await post({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/create`, // Updated URL for the single issues table
        headers: {
          authorization: authCtx.token,
        },
        body: {
          student_id: studentId,
          lab_id: labId,
          start_date: startDate,
          end_date: endDate,
          request_date: currentDate, // Sending the current date as the request_date field
          items: cartData,
          status: "pending", // Default status for new issue
        },
      });
    };
    makeRequest();
  };

  useEffect(() => {
    if (data) {
      alert(data.message);
      props.hideBackdrop();
      clearCart();
      router.reload();
    }
    if (error) alert(error);
  }, [data, error]);

  return (
    <div className={styles.main}>
      <div onClick={props.hideBackdrop} className={styles.close}>
        <img src="/images/close.svg" alt="close" />
      </div>
      <div className={styles.title}>
        <h1>Cart Summary</h1>
      </div>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.inventoryId} className={styles["cart-item"]}>
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* Reason Input Field */}
      <div className={styles.reason}>
        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for the request"
        />
      </div>

      {/* Start Date Input */}
      <div className={styles.date}>
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date Input */}
      <div className={styles.date}>
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button onClick={handleIssue} className={styles["btn-issue"]}>
        Submit Request
      </button>
    </div>
  );
};

export default CartModal;
