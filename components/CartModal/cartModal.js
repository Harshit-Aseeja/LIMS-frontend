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
  const { data, post, error } = useHttp();

  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(""); // Store start date
  const [endDate, setEndDate] = useState(""); // Store end date

  // Extract labId from the URL
  const { query } = router;
  const labId = query.lab_id;

  const handleIssue = (event) => {
    event.preventDefault();

    // Validate inputs
    if (!reason.trim()) {
      alert("Reason for the request cannot be empty.");
      return;
    }

    if (!startDate) {
      alert("Start date cannot be empty.");
      return;
    }

    if (!endDate) {
      alert("End date cannot be empty.");
      return;
    }

    // Validate dates
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
    if (startDate < today) {
      alert("Start date cannot be before the current date.");
      return;
    }

    if (endDate < startDate) {
      alert("End date cannot be before the start date.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const dept_name = authCtx.details?.dept;
    const studentId = authCtx.details?.roll_number;

    if (!labId || !studentId) {
      alert("Lab ID and student roll number are required to issue items.");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const cartData = cart.map((item) => ({
      inventoryId: item.inventoryId,
      quantity: item.quantity,
      dept_name: dept_name,
    }));

    const makeRequest = async () => {
      await post({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/create`,
        headers: {
          authorization: authCtx.token,
        },
        body: {
          student_id: studentId,
          lab_id: labId,
          start_date: startDate,
          end_date: endDate,
          request_date: currentDate,
          items: cartData,
          status: "pending",
          reason: reason,
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
      // Stay on the current lab page
      router.replace(`/labs/${labId}`);
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

      {/* Start and End Date Inputs */}
      <div className={styles["date-container"]}>
        <div className={styles.date}>
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.date}>
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleIssue} className={styles["btn-issue"]}>
        Submit Request
      </button>
    </div>
  );
};

export default CartModal;
