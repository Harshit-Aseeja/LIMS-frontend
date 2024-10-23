// CartButton.js
import React, { useState, useEffect } from "react";
import styles from "./CartButton.module.css";
import { useCart } from "hooks/cartContext";

const CartButton = ({ inventoryId, maxQuantity, itemName }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, updateQuantity, removeFromCart, cart } = useCart();

  useEffect(() => {
    const item = cart.find((item) => item.inventoryId === inventoryId);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, inventoryId]);

  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(inventoryId, 1, itemName);
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        updateQuantity(inventoryId, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      if (newQuantity > 0) {
        updateQuantity(inventoryId, newQuantity);
      } else {
        removeFromCart(inventoryId);
      }
      return newQuantity;
    });
  };

  return (
    <div className={styles["cart-button"]}>
      {quantity === 0 ? (
        <button onClick={handleAddToCart} className={styles["add-to-cart"]}>
          Add
        </button>
      ) : (
        <div className={styles["counter"]}>
          <button onClick={handleDecrement} className={styles["decrement"]}>
            -
          </button>
          <span className={styles["quantity"]}>{quantity}</span>
          <button onClick={handleIncrement} className={styles["increment"]}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default CartButton;
