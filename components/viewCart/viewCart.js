// ViewCart.js
import styles from "./ViewCart.module.css"; // Import your styles here
import Backdrop from "components/Backdrop/Backdrop"; // Ensure this is the correct path
import { useState, useContext } from "react";
import CartModal from "components/CartModal/cartModal"; // Import your CartModal
import CartContext from "hooks/cartContext";

const ViewCart = () => {
  const [showCartModal, setShowCartModal] = useState(false);
  const { cart } = useContext(CartContext); // Use the CartContext to access cart data

  const handleToggleCartModal = () => {
    setShowCartModal((prevState) => !prevState);
  };

  const hideBackdrop = () => {
    setShowCartModal(false);
  };

  return (
    <>
      {showCartModal && (
        <Backdrop hideBackdrop={hideBackdrop}>
          <CartModal hideBackdrop={hideBackdrop} />
        </Backdrop>
      )}
      <button onClick={handleToggleCartModal} className={styles.main}>
        {/* <img src="/images/cart_icon.svg" alt="Cart" />{" "} */}
        {/* Replace with your cart icon */}
        View Cart ({cart.length}) {/* Show the number of items in the cart */}
      </button>
    </>
  );
};

export default ViewCart;
