import React, { useContext, useEffect } from "react";
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

  const handleIssue = (event) => {
    event.preventDefault();

    // Ensure cart is not empty
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Get the department name from the context
    const dept_name = authCtx.details?.dept;

    // Prepare cart data for submission
    const cartData = cart.map((item) => ({
      inventoryId: item.inventoryId,
      quantity: item.quantity,
      dept_name: dept_name,
    }));

    const makeRequest = async () => {
      const response = await post({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/student/issue",
        headers: {
          authorization: authCtx.token,
        },
        body: { items: cartData },
      });
    };
    makeRequest();
  };

  useEffect(() => {
    if (data) {
      alert(data.message);
      props.hideBackdrop();
      clearCart(); // Clear the cart after successful issuance
      router.reload();
    }
    if (error) alert(error);
  }, [data, error]);

  return (
    <div className={styles.main}>
      <div onClick={props.hideBackdrop} className={styles.close}>
        <img src="/images/close.svg" alt="close"></img>
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
      <button onClick={handleIssue} className={styles["btn-issue"]}>
        Submit Request
      </button>
    </div>
  );
};

export default CartModal;
